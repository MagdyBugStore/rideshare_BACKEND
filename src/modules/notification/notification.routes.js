const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validate } = require('../../middlewares/validate');
const authMiddleware = require('../../middlewares/auth.middleware');
const { registerToken, removeToken } = require('./notification.service');
const { getNotifications, markAllRead } = require('./notification.controller');
const { sendSuccess } = require('../../utils/response.util');

const tokenSchema = Joi.object({
  token: Joi.string().min(10).required(),
});

// FCM token management
router.post('/token', authMiddleware, validate(tokenSchema), async (req, res, next) => {
  try {
    await registerToken(req.user.id, req.body.token);
    sendSuccess(res, null, 'Token registered');
  } catch (err) { next(err); }
});

router.delete('/token', authMiddleware, validate(tokenSchema), async (req, res, next) => {
  try {
    await removeToken(req.user.id, req.body.token);
    sendSuccess(res, null, 'Token removed');
  } catch (err) { next(err); }
});

// Notification list & read state
router.get('/',               authMiddleware, getNotifications);
router.patch('/mark-all-read', authMiddleware, markAllRead);

module.exports = router;
