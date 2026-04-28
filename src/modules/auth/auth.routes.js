const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const validation = require('./auth.validation');
const authMiddleware = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate');
const { otpLimiter } = require('../../middlewares/rateLimit.middleware');

router.post('/google', validate(validation.googleSchema), controller.googleLogin);
router.post('/refresh-token', validate(validation.refreshSchema), controller.refreshToken);
router.post('/logout', authMiddleware, controller.logout);
router.get('/me', authMiddleware, controller.getCurrentUser);
router.patch('/me', authMiddleware, validate(validation.profileUpdateSchema), controller.updateProfile);
router.patch('/role', authMiddleware, validate(validation.updateRoleSchema), controller.updateUserRole);
module.exports = router;