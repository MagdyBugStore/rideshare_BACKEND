const tripService = require('./trip.service');
const { sendSuccess, sendError } = require('../../utils/response.util');

const createTrip = async (req, res, next) => {
  try {
    const passengerId = req.user.id;
    const { captainId, startLocation } = req.body;
    const trip = await tripService.createTrip(passengerId, captainId, startLocation);
    sendSuccess(res, trip, 'تم إنشاء الرحلة بنجاح', 201);
  } catch (error) {
    next(error);
  }
};

const confirmStart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const trip = await tripService.confirmStart(id, userId, role);
    sendSuccess(res, trip, 'تم تأكيد بدء الرحلة');
  } catch (error) {
    next(error);
  }
};

const requestEnd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    const trip = await tripService.requestEndTrip(id, userId, role);
    sendSuccess(res, trip, 'تم إرسال طلب إنهاء الرحلة');
  } catch (error) {
    next(error);
  }
};

const confirmEnd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { distanceKm } = req.body;
    const userId = req.user.id;
    const role = req.user.role;
    const trip = await tripService.confirmEndTrip(id, userId, role, distanceKm);
    sendSuccess(res, trip, 'تم إنهاء الرحلة بنجاح');
  } catch (error) {
    next(error);
  }
};

const cancelTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;
    const trip = await tripService.cancelTrip(id, userId, reason);
    sendSuccess(res, trip, 'تم إلغاء الرحلة');
  } catch (error) {
    next(error);
  }
};

const getTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trip = await tripService.getTrip(id);
    sendSuccess(res, trip);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTrip,
  confirmStart,
  requestEnd,
  confirmEnd,
  cancelTrip,
  getTrip,
};