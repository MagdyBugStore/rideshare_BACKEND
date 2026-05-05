// src/modules/fare/fare.routes.js

const express = require('express');
const router = express.Router();
const controller = require('./fare.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');

// Public routes (no auth needed for getting fares)
router.get('/', controller.getFares);
router.get('/:vehicleType', controller.getFareByType);
router.post('/calculate', controller.calculateFare);

// Admin only routes
router.post('/:vehicleType', authMiddleware, requireRole('admin'), controller.upsertFare);
router.delete('/:vehicleType', authMiddleware, requireRole('admin'), controller.deleteFare);

module.exports = router;