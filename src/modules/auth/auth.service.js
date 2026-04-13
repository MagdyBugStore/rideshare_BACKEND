const User = require('../user/user.model');
const { generateTokens, verifyRefreshToken } = require('../../utils/jwt.util');
const { generateOtp, hashOtp, verifyOtp } = require('../../utils/otp.util');
const env = require('../../config/env');
const twilio = require('twilio')(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// -------------------- OTP --------------------
const sendOtp = async (phone) => {
  const otp = generateOtp();
  const hashedOtp = hashOtp(otp);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  // Upsert user with temporary OTP data
  await User.findOneAndUpdate(
    { phone },
    { otpCode: hashedOtp, otpExpiresAt: expiresAt },
    { upsert: true, new: true }
  );

  // In production, send via Twilio
  if (env.NODE_ENV === 'production') {
    await twilio.messages.create({
      body: `Your Wasalni verification code is: ${otp}`,
      to: phone,
      from: env.TWILIO_PHONE,
    });
  } else {
    console.log(`🔐 OTP for ${phone}: ${otp}`);
  }

  return true;
};

const verifyOtpAndLogin = async (phone, otp) => {
  const user = await User.findOne({ phone });
  if (!user || !user.otpCode || !user.otpExpiresAt) {
    throw new Error('OTP not requested or expired');
  }

  if (new Date() > user.otpExpiresAt) {
    throw new Error('OTP expired');
  }

  if (!verifyOtp(otp, user.otpCode)) {
    throw new Error('Invalid OTP');
  }

  // Clear OTP fields
  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  const { accessToken, refreshToken } = generateTokens(user._id, user.role);
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

// -------------------- Google --------------------
const verifyGoogle = async (idToken) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { sub: googleId, email, name, picture } = payload;

  let user = await User.findOne({ $or: [{ googleId }, { email }] });
  if (!user) {
    user = await User.create({
      googleId,
      email,
      name,
      avatar: picture,
      role: 'passenger', // default
    });
  } else if (!user.googleId) {
    user.googleId = googleId;
    await user.save();
  }

  const { accessToken, refreshToken } = generateTokens(user._id, user.role);
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

// -------------------- Refresh --------------------
const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) throw new Error('Invalid refresh token');

  const user = await User.findOne({ _id: decoded.id, refreshToken });
  if (!user) throw new Error('Refresh token not found');

  const { accessToken } = generateTokens(user._id, user.role);
  return { accessToken };
};

// -------------------- Logout --------------------
const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  return true;
};

module.exports = {
  sendOtp,
  verifyOtpAndLogin,
  verifyGoogle,
  refreshAccessToken,
  logout,
};