const Captain = require('../captain/captain.model');
const Trip = require('../trip/trip.model');
const { sendSuccess, sendError } = require('../../utils/response.util');

const getPendingCaptains = async (req, res, next) => {
  try {
    const pending = await Captain.find({ status: 'pending_review' })
      .populate('userId', 'name phone email')
      .sort({ createdAt: -1 });
    sendSuccess(res, pending);
  } catch (error) {
    next(error);
  }
};

const getLiveTrips = async (req, res, next) => {
  try {
    const liveTrips = await Trip.find({ status: 'active' })
      .populate('passengerId', 'name phone')
      .populate('captainId', 'vehicleType vehicleModel plateNumber')
      .sort({ startedAt: -1 });
    sendSuccess(res, liveTrips);
  } catch (error) {
    next(error);
  }
};
const approveCaptainByCode = async (req, res, next) => {
  try {
    const { code, action } = req.body; // action = 'approve' or 'reject'
    const captain = await Captain.findOne({ applicationCode: code });
    if (!captain) return sendError(res, 'Invalid code', 404);
    if (action === 'approve') {
      captain.applicationStatus = 'approved';
      captain.status = 'approved'; // optional: make captain active directly
    } else if (action === 'reject') {
      captain.applicationStatus = 'rejected';
    } else {
      return sendError(res, 'Invalid action', 400);
    }
    await captain.save();
    sendSuccess(res, { status: captain.applicationStatus });
  } catch (error) {
    next(error);
  }
};
module.exports = { getPendingCaptains, getLiveTrips, approveCaptainByCode };