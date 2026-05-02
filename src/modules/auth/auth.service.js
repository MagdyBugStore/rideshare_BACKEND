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

  // Create user with phone as placeholder name if new
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
    isNewUser: !user.googleId && !user.name?.includes(phone) === false,
    // Only expose in development for easy testing
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

  // Clear OTP fields
  user.otpCode = undefined;
  user.otpExpiresAt = undefined;

  // Update name if provided (useful for new users completing profile)
  if (name && (user.name === user.phone || !user.name)) {
    user.name = name;
  }

  await authRepo.saveDoc(user);

  logger.info(`[Auth] OTP verified for ${phone}`);
  return _issueTokens(user);
};

// ─────────────────────────────────────────────────────────────
// Refresh token
// ─────────────────────────────────────────────────────────────
const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) throw new Error('Invalid refresh token');

  const user = await authRepo.findByIdAndToken(decoded.id, refreshToken);
  if (!user) throw new Error('Refresh token not found or revoked');

  const { accessToken } = generateTokens(user._id, user.role);
  return { accessToken };
};

// ─────────────────────────────────────────────────────────────
// Logout
// ─────────────────────────────────────────────────────────────
const logout = async (userId) => {
  await authRepo.clearRefreshToken(userId);
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
async function _issueTokens(user) {
  const { accessToken, refreshToken } = generateTokens(user._id, user.role);
  user.refreshToken = refreshToken;
  await authRepo.saveDoc(user);
  // Exclude sensitive fields from response
  const safe = user.toObject();
  delete safe.refreshToken;
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
