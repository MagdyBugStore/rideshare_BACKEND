const authService = require('./auth.service');
const { sendSuccess, sendError } = require('../../utils/response.util');

const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) return sendError(res, 'Phone number required', 400);
    await authService.sendOtp(phone);
    sendSuccess(res, null, 'OTP sent successfully');
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return sendError(res, 'Phone and OTP required', 400);
    const { user, accessToken, refreshToken } = await authService.verifyOtpAndLogin(phone, otp);
    sendSuccess(res, { user, accessToken, refreshToken }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

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

module.exports = {
  sendOtp,
  verifyOtp,
  googleLogin,
  refreshToken,
  logout,
};