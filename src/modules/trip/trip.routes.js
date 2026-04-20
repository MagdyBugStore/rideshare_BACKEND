const express = require('express');
const router = express.Router();
const controller = require('./trip.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');

// إنشاء رحلة (يحتاج راكب)
router.post('/', authMiddleware, requireRole('passenger'), controller.createTrip);

// تأكيد البدء (يمكن للراكب أو الكابتن)
router.patch('/:id/start', authMiddleware, controller.confirmStart);

// طلب إنهاء (راكب أو كابتن)
router.patch('/:id/request-end', authMiddleware, controller.requestEnd);

// تأكيد إنهاء (راكب أو كابتن)
router.patch('/:id/confirm-end', authMiddleware, controller.confirmEnd);

// إلغاء (راكب أو كابتن)
router.patch('/:id/cancel', authMiddleware, controller.cancelTrip);

// الحصول على تفاصيل رحلة
router.get('/:id', authMiddleware, controller.getTrip);

module.exports = router;