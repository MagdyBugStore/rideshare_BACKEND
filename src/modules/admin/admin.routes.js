const express = require('express');
const router = express.Router();
const controller = require('./admin.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');

router.get('/captains/pending', authMiddleware, requireRole('admin'), controller.getPendingCaptains);
router.get('/trips/live', authMiddleware, requireRole('admin'), controller.getLiveTrips);
router.post('/captain/approve-by-code', authMiddleware, requireRole('admin'), controller.approveCaptainByCode);

module.exports = router;