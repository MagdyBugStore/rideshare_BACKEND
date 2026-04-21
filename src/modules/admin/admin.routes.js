// src/modules/admin/admin.routes.js
const express = require('express');
const router = express.Router();
const controller = require('./admin.controller');
// في حال أردت إضافة المصادقة لاحقاً، استخدم التالي:
// const authMiddleware = require('../../middlewares/auth.middleware');
// const { requireRole } = require('../../middlewares/role.middleware');

// ==================== المستخدمون ====================
// GET /api/admin/users - الحصول على جميع المستخدمين
router.get('/users', controller.getUsers);

// PATCH /api/admin/users/:userId - تعديل مستخدم
router.patch('/users/:userId', controller.updateUser);

// DELETE /api/admin/users/:userId - حذف مستخدم
router.delete('/users/:userId', controller.deleteUser);

// ==================== الكباتن ====================
// GET /api/admin/captains - الحصول على جميع الكباتن
router.get('/captains', controller.getAllCaptains);

// POST /api/admin/captains - إضافة كابتن جديد
router.post('/captains', controller.createCaptain);

// PATCH /api/admin/captains/:captainId - تعديل كابتن
router.patch('/captains/:captainId', controller.updateCaptain);

// DELETE /api/admin/captains/:captainId - حذف كابتن
router.delete('/captains/:captainId', controller.deleteCaptain);

// GET /api/admin/captains/pending - الحصول على الكباتن المعلقين
router.get('/captains/pending', controller.getPendingCaptains);

// PATCH /api/admin/captains/:captainId/approve - الموافقة على كابتن
router.patch('/captains/:captainId/approve', controller.approveCaptain);

// PATCH /api/admin/captains/:captainId/reject - رفض كابتن
router.patch('/captains/:captainId/reject', controller.rejectCaptain);

// ==================== الرحلات ====================
// GET /api/admin/trips/live - الحصول على الرحلات النشطة
router.get('/trips/live', controller.getLiveTrips);

// POST /api/admin/trips - إنشاء رحلة
router.post('/trips', controller.createTrip);

// DELETE /api/admin/trips/:tripId - حذف رحلة
router.delete('/trips/:tripId', controller.deleteTrip);

// ==================== دوال قديمة للتوافق ====================
// POST /api/admin/captain/approve-by-code - موافقة أو رفض بكود التقديم
router.post('/captain/approve-by-code', controller.approveCaptainByCode);

module.exports = router;