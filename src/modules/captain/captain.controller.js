const captainService = require('./captain.service');
const captainRepo = require('./captain.repository');
const { sendSuccess, sendError } = require('../../utils/response.util');
const { generateApplicationCode } = require('../../utils/code.util');

const wrap = (fn) => async (req, res, next) => {
  try { await fn(req, res, next); } catch (err) { next(err); }
};

// ── Registration / profile ────────────────────────────────────────────
const applyCaptain = wrap(async (req, res) => {
  const userId = req.user.id;
  const { vehicleType, vehicleModel, plateNumber, vehicleColor } = req.body;

  let captain = await captainRepo.findByUserId(userId);

  if (!captain) {
    const Captain = require('./captain.model');
    const code = generateApplicationCode();
    captain = await Captain.create({
      userId,
      applicationCode: code,
      applicationStatus: 'pending_approval',
      status: 'pending_review',
      vehicleType:  vehicleType  || undefined,
      vehicleModel: vehicleModel || undefined,
      plateNumber:  plateNumber  || undefined,
      vehicleColor: vehicleColor || undefined,
    });
    return sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus }, 'Captain application created', 201);
  }

  if (vehicleType)  captain.vehicleType  = vehicleType;
  if (vehicleModel) captain.vehicleModel = vehicleModel;
  if (plateNumber)  captain.plateNumber  = plateNumber;
  if (vehicleColor) captain.vehicleColor = vehicleColor;

  await captainRepo.saveDoc(captain);
  sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus, vehicleInfoUpdated: true }, 'Captain data updated');
});

const checkApplicationStatus = wrap(async (req, res) => {
  const captain = await captainRepo.findByUserId(req.user.id);
  if (!captain) return sendError(res, 'No application found', 404);
  sendSuccess(res, { code: captain.applicationCode, status: captain.applicationStatus });
});

const getStatus = wrap(async (req, res) => {
  const status = await captainService.getCaptainStatus(req.user.id);
  sendSuccess(res, status);
});

// ── Availability ──────────────────────────────────────────────────────
const toggleOnline = wrap(async (req, res) => {
  const { isOnline } = req.body;
  const captain = await captainService.toggleOnline(req.user.id, isOnline);
  sendSuccess(res, { isOnline: captain.isOnline });
});

// ── Nearby captains (passenger-facing) ───────────────────────────────
const getNearbyDrivers = wrap(async (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng) return sendError(res, 'lat and lng are required', 400);
  const captains = await captainService.getNearbyDrivers(
    parseFloat(lat),
    parseFloat(lng),
    radius ? parseFloat(radius) : 5
  );
  sendSuccess(res, captains);
});

// ── Location (REST fallback) ──────────────────────────────────────────
const updateLocation = wrap(async (req, res) => {
  const { lat, lng } = req.body;
  await captainService.updateLocation(req.user.id, lat, lng);
  sendSuccess(res, null, 'Location updated');
});

// ── Documents ─────────────────────────────────────────────────────────
const uploadSingleDoc = wrap(async (req, res) => {
  const { type } = req.params;
  const allowed = ['nationalId', 'driverLicense', 'vehicleLicense'];
  if (!allowed.includes(type)) return sendError(res, 'Invalid document type', 400);
  if (!req.file) return sendError(res, 'No file uploaded', 400);

  await captainService.updateSingleDocument(req.user.id, type, req.file.path);
  sendSuccess(res, { field: type, url: req.file.path }, 'Document uploaded');
});

// ── Personal & vehicle info ───────────────────────────────────────────
const updatePersonal = wrap(async (req, res) => {
  const captain = await captainService.updatePersonal(req.user.id, req.body);
  sendSuccess(res, captain, 'Personal info updated');
});

const updateVehicle = wrap(async (req, res) => {
  const captain = await captainService.updateVehicle(req.user.id, req.body);
  sendSuccess(res, captain, 'Vehicle info updated');
});

// ── Admin actions ─────────────────────────────────────────────────────
const adminApprove = wrap(async (req, res) => {
  const captain = await captainService.approveCaptain(req.params.id);
  sendSuccess(res, captain, 'Captain approved');
});

const adminReject = wrap(async (req, res) => {
  const captain = await captainService.rejectCaptain(req.params.id, req.body.reason);
  sendSuccess(res, captain, 'Captain rejected');
});

module.exports = {
  applyCaptain,
  checkApplicationStatus,
  getStatus,
  toggleOnline,
  getNearbyDrivers,
  updateLocation,
  uploadSingleDoc,
  updatePersonal,
  updateVehicle,
  adminApprove,
  adminReject,
};
