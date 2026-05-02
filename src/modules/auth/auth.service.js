const authRepo = require('./auth.repository');
const userRepo = require('../user/user.repository');
const { generateTokens, verifyRefreshToken } = require('../../utils/jwt.util');
const { generateOtp, hashOtp, verifyOtp } = require('../../utils/otp.util');
const env = require('../../config/env');
const logger = require('../../config/logger');

const OTP_TTL_SECONDS = 300; // 5 minutes

// ─────────────────────────────────────────────────────────────
// Google OAuth
// ─────────────────────────────────────────────────────────────
const loginWithGoogle = async (idToken) => {
  const payload = _decodeGoogleToken(idToken);
  const { googleId, email, name, picture } = payload;

  let user = await authRepo.findByGoogleOrEmail(googleId, email);
  if (!user) {
    user = await authRepo.createUser({ googleId, email, name, avatar: picture, role: null });
  } else {
    if (!user.googleId) user.googleId = googleId;
    if (!user.name && name) user.name = name;
    if (!user.avatar && picture) user.avatar = picture;
    await authRepo.saveDoc(user);
  }

  return _issueTokens(user);
};

// ─────────────────────────────────────────────────────────────
// OTP — Step 1: Send
// ─────────────────────────────────────────────────────────────
const sendOtp = async (phone) => {
  let user = await userRepo.findOne({ phone });

  if (!user) {
    user = await userRepo.create({ name: phone, phone, role: null });
  }

  const otp = generateOtp();
  user.otpCode = hashOtp(otp);
  user.otpExpiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);
  await authRepo.saveDoc(user);

  await _sendOtpViaSms(phone, otp);

  logger.info(`[Auth] OTP sent to ${phone}`);

  return {
    message: 'OTP sent',
    expiresIn: OTP_TTL_SECONDS,
    ...(env.NODE_ENV !== 'production' && { devOtp: otp }),
  };
};

// ─────────────────────────────────────────────────────────────
// OTP — Step 2: Verify + Login
// ─────────────────────────────────────────────────────────────
const verifyOtpAndLogin = async (phone, code, name) => {
  const user = await userRepo.findOne({ phone }, '+otpCode +otpExpiresAt');
  if (!user || !user.otpCode) throw new Error('OTP not found — request a new one');

  if (user.otpExpiresAt < new Date()) {
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;
    await authRepo.saveDoc(user);
    throw new Error('OTP expired');
  }

  if (!verifyOtp(code, user.otpCode)) throw new Error('Invalid OTP');

  user.otpCode = undefined;
  user.otpExpiresAt = undefined;

  if (name && (user.name === user.phone || !user.name)) {
    user.name = name;
  }

  await authRepo.saveDoc(user);

  logger.info(`[Auth] OTP verified for ${phone}`);
  return _issueTokens(user);
};

// ─────────────────────────────────────────────────────────────
// Refresh token (with rotation)
// ─────────────────────────────────────────────────────────────
const refreshAccessToken = async (token) => {
  const decoded = verifyRefreshToken(token);
  if (!decoded) throw new Error('Invalid refresh token');

  const user = await authRepo.findByIdAndToken(decoded.id, token);
  if (!user) throw new Error('Refresh token not found or revoked');

  const { accessToken, refreshToken: newRefresh } = generateTokens(user._id, user.role);

  // Rotate: invalidate old token, register new one
  await authRepo.removeRefreshToken(user._id, token);
  await authRepo.addRefreshToken(user._id, newRefresh);

  return { accessToken, refreshToken: newRefresh };
};

// ─────────────────────────────────────────────────────────────
// Logout — single device (specific token) or all devices
// ─────────────────────────────────────────────────────────────
const logout = async (userId, refreshToken) => {
  if (refreshToken) {
    await authRepo.removeRefreshToken(userId, refreshToken);
  } else {
    await authRepo.clearAllRefreshTokens(userId);
  }
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
async function _issueTokens(user) {
  const { accessToken, refreshToken } = generateTokens(user._id, user.role);
  await authRepo.addRefreshToken(user._id, refreshToken);
  const safe = user.toObject();
  delete safe.refreshTokens;
  delete safe.otpCode;
  delete safe.otpExpiresAt;
  return { user: safe, accessToken, refreshToken };
}

function _decodeGoogleToken(idToken) {
  try {
    const parts = idToken.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      if (payload?.sub) {
        return {
          googleId: payload.sub,
          email: payload.email ?? null,
          name: payload.name || payload.email?.split('@')[0] || 'مستخدم',
          picture: payload.picture ?? null,
        };
      }
    }
  } catch (_) {}
  return {
    googleId: `dev_${Date.now()}`,
    email: `dev_${Date.now()}@temp.com`,
    name: 'مستخدم مؤقت',
    picture: null,
  };
}

async function _sendOtpViaSms(phone, otp) {
  if (env.NODE_ENV !== 'production') {
    logger.info(`[Auth] DEV OTP for ${phone}: ${otp}`);
    return;
  }
  try {
    const twilio = require('twilio')(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
    await twilio.messages.create({
      body: `كود التحقق لوصلني: ${otp} — صالح لمدة 5 دقائق`,
      from: env.TWILIO_PHONE,
      to: `+2${phone}`,
    });
  } catch (err) {
    logger.error('[Auth] Twilio send failed', err);
    throw new Error('Failed to send OTP — please try again');
  }
}

module.exports = { loginWithGoogle, sendOtp, verifyOtpAndLogin, refreshAccessToken, logout };
