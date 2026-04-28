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
    const { lat, lng } = req.query;
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
    const { vehicleType, vehicleModel, plateNumber, vehicleColor } = req.body;

    let captain = await Captain.findOne({ userId });

    if (!captain) {
      const code = generateApplicationCode();
      captain = await Captain.create({
        userId,
        applicationCode: code,
        applicationStatus: 'pending_approval',
        status: 'pending_review',
        vehicleType: vehicleType || undefined,
        vehicleModel: vehicleModel || undefined,
        plateNumber: plateNumber || undefined,
        vehicleColor: vehicleColor || undefined,
      });
      return sendSuccess(res, {
        code: captain.applicationCode,
        status: captain.applicationStatus,
      }, 'تم إنشاء طلب الكابتن بنجاح', 201);
    }

    if (vehicleType) captain.vehicleType = vehicleType;
    if (vehicleModel) captain.vehicleModel = vehicleModel;
    if (plateNumber) captain.plateNumber = plateNumber;
    if (vehicleColor) captain.vehicleColor = vehicleColor;

    if (captain.applicationStatus === 'pending_approval' && captain.status !== 'approved') {
      captain.status = 'pending_review';
    }

    await captain.save();

    sendSuccess(res, {
      code: captain.applicationCode,
      status: captain.applicationStatus,
      vehicleInfoUpdated: true,
    }, 'تم تحديث بيانات الكابتن بنجاح');

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

const updateLocation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { lat, lng } = req.body;
    await captainService.updateLocation(userId, lat, lng);
    sendSuccess(res, null, 'Location updated');
  } catch (error) {
    next(error);
  }
};

const uploadSingleDoc = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type } = req.params;

    // التحقق من النوع (مهم)
    const allowedTypes = ['nationalId', 'driverLicense', 'vehicleLicense'];
    if (!allowedTypes.includes(type)) {
      return sendError(res, 'نوع المستند غير صالح', 400);
    }

    const documentUrl = req.file.path;

    const captain = await captainService.updateSingleDocument(userId, type, documentUrl);

    sendSuccess(res, {
      field: type,
      url: documentUrl,
    }, 'تم رفع المستند بنجاح');
  } catch (error) {
    next(error);
  }
};
const updatePersonal = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { nationalId, address, governorate, dateOfBirth } = req.body;
    const captain = await captainService.updateCaptainPersonal(userId, {
      nationalId, address, governorate, dateOfBirth
    });
    sendSuccess(res, captain, 'تم تحديث البيانات الشخصية');
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { vehicleType, vehicleModel, plateNumber, vehicleColor, passengerCapacity } = req.body;
    const captain = await captainService.updateCaptainVehicle(userId, {
      vehicleType, vehicleModel, plateNumber, vehicleColor, passengerCapacity
    });
    sendSuccess(res, captain, 'تم تحديث بيانات المركبة');
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
  updateLocation,
  uploadSingleDoc,
  updatePersonal,
  updatePersonal,
  updateVehicle,
};