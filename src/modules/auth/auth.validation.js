const Joi = require('joi');


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

const sendOtpSchema = Joi.object({
  phone: Joi.string().pattern(/^01[0-9]{9}$/).required(),
});

const verifyOtpSchema = Joi.object({
  phone: Joi.string().pattern(/^01[0-9]{9}$/).required(),
  code: Joi.string().length(6).required(),
  name: Joi.string().min(2).max(50).optional(),
});

const toggleOnlineSchema = Joi.object({
  isOnline: Joi.boolean().required(),
});
const updateRoleSchema = Joi.object({
  role: Joi.string().valid('passenger', 'captain').required(),
});
const profileUpdateSchema = Joi.object({
  name: Joi.string().min(2),
  phone: Joi.string().regex(/^01[0-9]{9}$/),
});

module.exports = {
  googleSchema,
  sendOtpSchema,
  verifyOtpSchema,
  refreshSchema,
  registerCaptainSchema,
  toggleOnlineSchema,
  updateRoleSchema,
  profileUpdateSchema
};