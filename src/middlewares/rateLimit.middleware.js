const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 3, 
  message: { success: false, message: 'Too many OTP requests, try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { otpLimiter };