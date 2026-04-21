// src/modules/admin/admin.controller.js
const adminService = require('./admin.service');
const { sendSuccess, sendError } = require('../../utils/response.util');
const Captain = require('../captain/captain.model');
const User = require('../user/user.model');
const Trip = require('../trip/trip.model');

// ---------- المستخدمون ----------
const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    sendSuccess(res, users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await adminService.updateUser(userId, req.body);
    sendSuccess(res, updatedUser, 'تم تحديث المستخدم بنجاح');
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await adminService.deleteUser(userId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

// ---------- الكباتن (عام) ----------
const getAllCaptains = async (req, res, next) => {
  try {
    const captains = await adminService.getAllCaptains();
    sendSuccess(res, captains);
  } catch (error) {
    next(error);
  }
};

const createCaptain = async (req, res, next) => {
  try {
    const captain = await adminService.createCaptain(req.body);
    sendSuccess(res, captain, 'تم إنشاء الكابتن بنجاح', 201);
  } catch (error) {
    next(error);
  }
};

const updateCaptain = async (req, res, next) => {
  try {
    const { captainId } = req.params;
    const captain = await adminService.updateCaptain(captainId, req.body);
    sendSuccess(res, captain, 'تم تحديث الكابتن بنجاح');
  } catch (error) {
    next(error);
  }
};

const deleteCaptain = async (req, res, next) => {
  try {
    const { captainId } = req.params;
    const result = await adminService.deleteCaptain(captainId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

// ---------- الكباتن المعلقون (موافقات) ----------
const getPendingCaptains = async (req, res, next) => {
  try {
    const captains = await adminService.getPendingCaptains();
    sendSuccess(res, captains);
  } catch (error) {
    next(error);
  }
};

const approveCaptain = async (req, res, next) => {
  try {
    const { captainId } = req.params;
    const captain = await adminService.approveCaptain(captainId);
    sendSuccess(res, captain, 'تمت الموافقة على الكابتن');
  } catch (error) {
    next(error);
  }
};

const rejectCaptain = async (req, res, next) => {
  try {
    const { captainId } = req.params;
    const { reason } = req.body;
    const captain = await adminService.rejectCaptain(captainId, reason);
    sendSuccess(res, captain, 'تم رفض الكابتن');
  } catch (error) {
    next(error);
  }
};

// ---------- الرحلات ----------
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

const createTrip = async (req, res, next) => {
  try {
    const trip = await adminService.createTrip(req.body);
    sendSuccess(res, trip, 'تم إنشاء الرحلة بنجاح', 201);
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const { tripId } = req.params;
    const result = await adminService.deleteTrip(tripId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

// ---------- دوال قديمة / خاصة ----------
const approveCaptainByCode = async (req, res, next) => {
  try {
    const { code, action } = req.body;
    const captain = await Captain.findOne({ applicationCode: code });
    if (!captain) return sendError(res, 'Invalid code', 404);
    if (action === 'approve') {
      captain.applicationStatus = 'approved';
      captain.status = 'approved';
      await captain.save();
      await User.findByIdAndUpdate(captain.userId, { role: 'captain' });
    } else if (action === 'reject') {
      captain.applicationStatus = 'rejected';
      await captain.save();
    } else {
      return sendError(res, 'Invalid action', 400);
    }
    sendSuccess(res, { status: captain.applicationStatus });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getAllCaptains,
  createCaptain,
  updateCaptain,
  deleteCaptain,
  getPendingCaptains,
  approveCaptain,
  rejectCaptain,
  getLiveTrips,
  createTrip,
  deleteTrip,
  approveCaptainByCode,
};