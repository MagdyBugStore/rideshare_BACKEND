const express = require('express');
const router = express.Router();
const controller = require('./captain.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');
const { uploadDocuments } = require('../../middlewares/upload.middleware');
const { validate } = require('../../middlewares/validate');
const { registerCaptainSchema, toggleOnlineSchema } = require('../auth/auth.validation');

router.post('/register', authMiddleware, validate(registerCaptainSchema), controller.register);
router.post('/documents', authMiddleware, uploadDocuments, controller.uploadDocs);
router.get('/status', authMiddleware, controller.getStatus);
router.get('/nearby', authMiddleware, requireRole('passenger'), controller.getNearbyDrivers);
router.patch('/online', authMiddleware, requireRole('captain'), validate(toggleOnlineSchema), controller.toggleOnline);
router.post('/location', authMiddleware, requireRole('captain'), controller.updateLocation);

router.patch('/admin/captain/:id/approve', authMiddleware, requireRole('admin'), controller.adminApprove);
router.patch('/admin/captain/:id/reject', authMiddleware, requireRole('admin'), controller.adminReject);
router.post('/apply', authMiddleware, controller.applyCaptain);
router.get('/application/status', authMiddleware, controller.checkApplicationStatus);
router.post('/apply', authMiddleware, controller.applyCaptain);
router.get('/application/status', authMiddleware, controller.checkApplicationStatus);
module.exports = router;