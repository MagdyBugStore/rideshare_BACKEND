const authService = require('./auth.service');
const userRepo = require('../user/user.repository');
const Captain = require('../captain/captain.model');
const { generateTokens } = require('../../utils/jwt.util');
const { generateApplicationCode } = require('../../utils/code.util');
const { sendSuccess, sendError } = require('../../utils/response.util');

const wrap = (fn) => async (req, res, next) => {
  try { await fn(req, res, next); } catch (err) { next(err); }
};

const googleLogin = wrap(async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return sendError(res, 'idToken required', 400);
  const result = await authService.loginWithGoogle(idToken);
  sendSuccess(res, result, 'Google login successful');
});

const refreshToken = wrap(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return sendError(res, 'Refresh token required', 400);
  const result = await authService.refreshAccessToken(refreshToken);
  sendSuccess(res, result, 'Token refreshed');
});

const logout = wrap(async (req, res) => {
  await authService.logout(req.user.id);
  sendSuccess(res, null, 'Logged out successfully');
});

const getCurrentUser = wrap(async (req, res) => {
  const user = await userRepo.findById(req.user.id);
  if (!user) return sendError(res, 'User not found', 404);

  let captain = null;
  if (user.role === 'captain') {
    captain = await Captain.findOne({ userId: user._id }).select(
      'status isOnline applicationStatus rejectionReason vehicleType vehicleModel plateNumber vehicleColor'
    );
  }

  sendSuccess(res, { user, captain });
});

const updateUserRole = wrap(async (req, res) => {
  const { role } = req.body;
  if (!['passenger', 'captain'].includes(role)) {
    return sendError(res, 'Invalid role', 400);
  }

  const user = await userRepo.updateById(
    req.user.id,
    { role },
    { runValidators: true, select: '-refreshToken -otpCode -otpExpiresAt' }
  );
  if (!user) return sendError(res, 'User not found', 404);

  let applicationCode = null;
  if (role === 'captain') {
    const existing = await Captain.findOne({ userId: user._id });
    if (!existing) {
      const code = generateApplicationCode();
      await Captain.create({
        userId: user._id,
        applicationCode: code,
        applicationStatus: 'pending_approval',
        status: 'pending_review',
      });
      applicationCode = code;
    }
  }

  const tokens = generateTokens(user._id, user.role);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  sendSuccess(res, {
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    applicationCode,
  }, 'Role updated');
});

const updateProfile = wrap(async (req, res) => {
  const { name, phone } = req.body;
  const user = await userRepo.updateById(
    req.user.id,
    { $set: { name, phone } },
    { select: '-refreshToken' }
  );
  sendSuccess(res, user, 'Profile updated');
});

const sendOtp = wrap(async (req, res) => {
  const result = await authService.sendOtp(req.body.phone);
  sendSuccess(res, result, 'OTP sent');
});

const verifyOtp = wrap(async (req, res) => {
  const result = await authService.verifyOtpAndLogin(req.body.phone, req.body.code, req.body.name);
  sendSuccess(res, result, 'Login successful');
});

module.exports = { googleLogin, sendOtp, verifyOtp, refreshToken, logout, getCurrentUser, updateUserRole, updateProfile };
