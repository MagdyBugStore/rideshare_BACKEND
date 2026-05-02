const express = require('express');
const router = express.Router();
const controller = require('./captain.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');
const { validate } = require('../../middlewares/validate');
const { toggleOnlineSchema } = require('../auth/auth.validation');
const { uploadDocuments, uploadSingleDocument } = require('../../middlewares/upload.middleware');

// ── Captain profile / application ─────────────────────────────────────
router.post('/apply',              authMiddleware, controller.applyCaptain);
router.get('/application/status',  authMiddleware, controller.checkApplicationStatus);
router.get('/status',              authMiddleware, controller.getStatus);
router.patch('/personal',          authMiddleware, controller.updatePersonal);
router.patch('/vehicle',           authMiddleware, controller.updateVehicle);

// ── Documents ─────────────────────────────────────────────────────────
router.post('/documents/:type', authMiddleware, requireRole('captain'), uploadSingleDocument, controller.uploadSingleDoc);
router.post('/documents',       authMiddleware, requireRole('captain'), uploadDocuments,       controller.uploadSingleDoc);

// ── Availability & location ───────────────────────────────────────────
router.patch('/online',   authMiddleware, requireRole('captain'), validate(toggleOnlineSchema), controller.toggleOnline);
router.post('/location',  authMiddleware, requireRole('captain'), controller.updateLocation);

// ── Nearby (passenger-facing) ─────────────────────────────────────────
router.get('/nearby', authMiddleware, requireRole('passenger'), controller.getNearbyDrivers);

// ── Admin actions ─────────────────────────────────────────────────────
router.patch('/:id/approve', authMiddleware, requireRole('admin'), controller.adminApprove);
router.patch('/:id/reject',  authMiddleware, requireRole('admin'), controller.adminReject);

module.exports = router;
