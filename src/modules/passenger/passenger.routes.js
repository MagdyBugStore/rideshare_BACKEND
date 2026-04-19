const express = require('express');
const router = express.Router();
const controller = require('./passenger.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');

router.get(
  '/drivers/nearby',
  authMiddleware,
  requireRole('passenger'),
  controller.getNearbyDrivers
);

module.exports = router;