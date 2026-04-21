const User = require('../user/user.model');
const { generateTokens, verifyRefreshToken } = require('../../utils/jwt.util');
const { generateOtp, hashOtp, verifyOtp } = require('../../utils/otp.util');
const env = require('../../config/env');
const twilio = require('twilio')(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// -------------------- Google --------------------
const verifyGoogle = async (idToken) => {
  // TODO: Re-enable proper ID token verification in production
  // For development: decode token without verification
  const decodeBase64 = (str) => {
    try {
      return JSON.parse(Buffer.from(str, 'base64').toString());
    } catch (e) {
      return null;
    }
  };

  const tokenParts = idToken.split('.');
  let payload = null;
  if (tokenParts.length === 3) {
    payload = decodeBase64(tokenParts[1]);
  }

  let googleId, email, name, picture;

  if (payload && payload.sub) {
    googleId = payload.sub;
    email = payload.email;
    name = payload.name || email?.split('@')[0] || 'مستخدم Google';
    picture = payload.picture;
  } else {
    // Fallback for testing
    googleId = `temp_${Date.now()}`;
    email = `user_${Date.now()}@temp.com`;
    name = 'مستخدم مؤقت';
    picture = null;
  }

  // التأكد من وجود name
  if (!name || name.trim() === '') {
    name = 'مستخدم';
  }

  let user = await User.findOne({ $or: [{ googleId }, { email }] });
  if (!user) {
    user = await User.create({
      googleId,
      email,
      name,
      avatar: picture,
      role: null
    });
  } else if (!user.googleId) {
    user.googleId = googleId;
    if (!user.name && name) user.name = name;
    if (!user.avatar && picture) user.avatar = picture;
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
  verifyGoogle,
  refreshAccessToken,
  logout,
};