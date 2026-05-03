const express = require('express');
const router = express.Router();
const controller = require('./trip.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { requireRole } = require('../../middlewares/role.middleware');
const { validate } = require('../../middlewares/validate');
const { searchTripSchema, createTripSchema, endTripSchema, cancelTripSchema, estimateFareSchema } = require('./trip.validation');

// ── Any authenticated user ────────────────────────────────────────────
// Must be before /:id routes to avoid param capture
router.get('/current', authMiddleware, controller.getCurrentTrip);

router.get('/:id',        authMiddleware, controller.getTrip);
router.post('/:id/cancel', authMiddleware, validate(cancelTripSchema), controller.cancelTrip);

// ── Passenger only ────────────────────────────────────────────────────
router.post('/estimate', authMiddleware, requireRole('passenger'), validate(estimateFareSchema), controller.estimateFare);
router.post('/search', authMiddleware, requireRole('passenger'), validate(searchTripSchema), controller.searchTrip);
router.post('/', authMiddleware, requireRole('passenger'), validate(createTripSchema), controller.createTrip);

// ── Passenger only (rating) ───────────────────────────────────────────
router.post('/:id/rate-captain', authMiddleware, requireRole('passenger'), controller.rateCaptain);

// ── Captain only ──────────────────────────────────────────────────────
router.post('/:id/accept',        authMiddleware, requireRole('captain'), controller.acceptTrip);
router.post('/:id/on-the-way',    authMiddleware, requireRole('captain'), controller.markOnTheWay);
router.post('/:id/arrived',       authMiddleware, requireRole('captain'), controller.markArrived);
router.post('/:id/start',         authMiddleware, requireRole('captain'), controller.startTrip);
router.post('/:id/end',           authMiddleware, requireRole('captain'), validate(endTripSchema), controller.endTrip);
router.post('/:id/rate-passenger',authMiddleware, requireRole('captain'), controller.ratePassenger);

module.exports = router;
