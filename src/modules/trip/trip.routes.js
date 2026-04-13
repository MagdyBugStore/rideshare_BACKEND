const express = require('express');
const router = express.Router();
const controller = require('./trip.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');

router.post('/', authMiddleware, requireRole('passenger'), controller.createTrip);
router.patch('/:id/start', authMiddleware, controller.confirmStart);
router.patch('/:id/request-end', authMiddleware, controller.requestEnd);
router.patch('/:id/confirm-end', authMiddleware, controller.confirmEnd);
router.patch('/:id/cancel', authMiddleware, controller.cancelTrip);
router.get('/:id', authMiddleware, controller.getTrip);

module.exports = router;