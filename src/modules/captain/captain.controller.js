const captainService = require('./captain.service');
const { sendSuccess, sendError } = require('../../utils/response.util');
const { generateApplicationCode } = require('../../utils/code.util');
const Captain = require('./captain.model');

const register = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const captain = await captainService.registerCaptain(userId, data);
    sendSuccess(res, captain, 'Captain registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

const uploadDocs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const files = req.files;
    const result = await captainService.uploadDocuments(userId, files);
    sendSuccess(res, result, 'Documents uploaded');
  } catch (error) {
    next(error);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const status = await captainService.getCaptainStatus(userId);
    sendSuccess(res, status);
  } catch (error) {
    next(error);
  }
};

const getNearbyDrivers = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    
    console.log('🧪 Development mode: returning real mock captains from DB');
    const captains = await Captain.find({
      status: 'approved',
      isOnline: true,
    })
      .populate('userId', 'name phone avatar')
      .lean();

    return captains.map(c => ({
      captain_id: c._id.toString(),
      name: c.userId.name,
      phone: c.userId.phone || '',
      avatar: c.userId.avatar,
      vehicle_type: c.vehicleType,
      vehicle_model: c.vehicleModel,
      vehicle_color: c.vehicleColor || '',
      plate_number: c.plateNumber,
      lat: c.location?.coordinates?.[1] || lat,
      lng: c.location?.coordinates?.[0] || lng,
      status: c.isOnline ? 'available' : 'busy',
      rating: c.rating || 0,
      total_trips: c.totalTrips || 0,
    }));
  }
};

const toggleOnline = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { isOnline } = req.body;
    const captain = await captainService.toggleOnline(userId, isOnline);
    sendSuccess(res, { isOnline: captain.isOnline });
  } catch (error) {
    next(error);
  }
};

// Admin only
const adminApprove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;
    const captain = await captainService.approveCaptain(id, adminId);
    sendSuccess(res, captain, 'Captain approved');
  } catch (error) {
    next(error);
  }
};

const adminReject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const captain = await captainService.rejectCaptain(id, reason);
    sendSuccess(res, captain, 'Captain rejected');
  } catch (error) {
    next(error);
  }
};

const applyCaptain = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let captain = await Captain.findOne({ userId });
    if (captain) {
      // إذا كان موجوداً وأعطاه كود من قبل
      return sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus });
    }
    const code = generateApplicationCode();
    captain = await Captain.create({
      userId,
      applicationCode: code,
      applicationStatus: 'pending_approval',
    });
    sendSuccess(res, { code, status: 'pending_approval' });
  } catch (error) {
    next(error);
  }
};

const checkApplicationStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const captain = await Captain.findOne({ userId }).select('applicationCode applicationStatus');
    if (!captain) return sendError(res, 'No application found', 404);
    sendSuccess(res, {
      code: captain.applicationCode,
      status: captain.applicationStatus,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  uploadDocs,
  getStatus,
  getNearbyDrivers,
  toggleOnline,
  adminApprove,
  adminReject,
  applyCaptain,
  checkApplicationStatus,
};