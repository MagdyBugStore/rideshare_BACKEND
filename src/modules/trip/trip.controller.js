const tripService = require('./trip.service');
const { sendSuccess, sendError } = require('../../utils/response.util');

// Thin wrapper — all business logic lives in trip.service
const wrap = (fn) => async (req, res, next) => {
  try { await fn(req, res, next); } catch (err) { next(err); }
};

// Dispatch-based trip creation — finds nearest captains automatically
const searchTrip = wrap(async (req, res) => {
  const trip = await tripService.searchTrip(req.user.id, req.body.startLocation, req.body.carType);
  sendSuccess(res, { tripId: trip._id, status: trip.status }, 'Searching for captain', 202);
});

// Direct trip creation — passenger manually selects captain from map
const createTrip = wrap(async (req, res) => {
  const trip = await tripService.createTrip(req.user.id, req.body.captainId, req.body.startLocation, req.body.carType);
  sendSuccess(res, trip, 'Trip created', 201);
});

const acceptTrip = wrap(async (req, res) => {
  const trip = await tripService.acceptTrip(req.params.id, req.user.id);
  sendSuccess(res, trip, 'Trip accepted');
});

const markOnTheWay = wrap(async (req, res) => {
  const trip = await tripService.markOnTheWay(req.params.id, req.user.id);
  sendSuccess(res, trip);
});

const markArrived = wrap(async (req, res) => {
  const trip = await tripService.markArrived(req.params.id, req.user.id);
  sendSuccess(res, trip);
});

const startTrip = wrap(async (req, res) => {
  const trip = await tripService.startTrip(req.params.id, req.user.id);
  sendSuccess(res, trip);
});

const endTrip = wrap(async (req, res) => {
  const trip = await tripService.endTrip(req.params.id, req.user.id, req.body.distanceKm);
  sendSuccess(res, trip);
});

const cancelTrip = wrap(async (req, res) => {
  const trip = await tripService.cancelTrip(req.params.id, req.user.id, req.user.role, req.body.reason);
  sendSuccess(res, trip, 'Trip cancelled');
});

const getCurrentTrip = wrap(async (req, res) => {
  const trip = await tripService.getCurrentTrip(req.user.id, req.user.role);
  sendSuccess(res, trip);
});

const getTrip = wrap(async (req, res) => {
  const trip = await tripService.getTrip(req.params.id);
  if (!trip) return sendError(res, 'Trip not found', 404);
  sendSuccess(res, trip);
});

const estimateFare = wrap(async (req, res) => {
  const { startLocation, endLocation, carType } = req.body;
  const result = tripService.estimateFare(
    startLocation.lat, startLocation.lng,
    endLocation.lat,   endLocation.lng,
    carType,
  );
  sendSuccess(res, result);
});

module.exports = {
  searchTrip,
  createTrip,
  acceptTrip,
  markOnTheWay,
  markArrived,
  startTrip,
  endTrip,
  cancelTrip,
  getCurrentTrip,
  getTrip,
  estimateFare,
};
