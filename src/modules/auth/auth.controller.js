const authService = require('./auth.service');
const { sendSuccess, sendError } = require('../../utils/response.util');
const User = require('../user/user.model');

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
    sendSuccess(res, { user });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  googleLogin,
  refreshToken,
  logout,
  getCurrentUser,
};