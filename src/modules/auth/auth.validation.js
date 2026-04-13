const Joi = require('joi');

const sendOtpSchema = Joi.object({
  phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
});

const verifyOtpSchema = Joi.object({
  phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
  otp: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
});

const googleSchema = Joi.object({
  idToken: Joi.string().required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
const registerCaptainSchema = Joi.object({
  vehicleType: Joi.string().valid('car', 'motorcycle', 'tukutuk', 'alt_tukutuk').required(),
  vehicleModel: Joi.string().min(2).max(50).required(),
  plateNumber: Joi.string().min(3).max(20).required(),
});

const toggleOnlineSchema = Joi.object({
  isOnline: Joi.boolean().required(),
});

module.exports = {
  sendOtpSchema,
  verifyOtpSchema,
  googleSchema,
  refreshSchema,
  registerCaptainSchema,
  toggleOnlineSchema,
};