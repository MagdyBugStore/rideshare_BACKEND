const authService = require('./auth.service');
const { sendSuccess, sendError } = require('../../utils/response.util');
const User = require('../user/user.model');
const { generateApplicationCode } = require('../../utils/code.util');
const Captain = require('../captain/captain.model');
const { generateTokens } = require('../../utils/jwt.util');


const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return sendError(res, 'idToken required', 400);
    const { user, accessToken, refreshToken } = await authService.verifyGoogle(idToken);
    sendSuccess(res, { user, accessToken, refreshToken }, 'Google login successful');
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return sendError(res, 'Refresh token required', 400);
    const { accessToken } = await authService.refreshAccessToken(refreshToken);
    sendSuccess(res, { accessToken }, 'Token refreshed');
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user.id; // from auth middleware
    await authService.logout(userId);
    sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};
const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-refreshToken');
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    let captain = null;
    if (user.role === 'captain') {
      captain = await Captain.findOne({ userId: user._id }).select('status isOnline applicationStatus rejectionReason vehicleType vehicleModel plateNumber vehicleColor');
    }

    sendSuccess(res, { user, captain });
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { role } = req.body;

    if (!['passenger', 'captain'].includes(role)) {
      return sendError(res, 'دور غير صالح', 400);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select('-refreshToken -otpCode -otpExpiresAt');

    if (!user) {
      return sendError(res, 'المستخدم غير موجود', 404);
    }

    let applicationCode = null;
    if (role === 'captain') {
      const existingCaptain = await Captain.findOne({ userId: user._id });
      if (!existingCaptain) {
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
      applicationCode
    }, 'تم تحديث الدور');
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, phone } },
      { new: true }
    ).select('-refreshToken');
    sendSuccess(res, user, 'Profile updated');
  } catch (error) { next(error); }
};

module.exports = {
  googleLogin,
  refreshToken,
  logout,
  getCurrentUser,
  updateUserRole,
  updateProfile
};