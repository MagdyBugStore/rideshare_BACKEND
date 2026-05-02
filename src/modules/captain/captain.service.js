const captainRepo = require('./captain.repository');
const userRepo = require('../user/user.repository');
const { generateApplicationCode } = require('../../utils/code.util');

const registerCaptain = async (userId, data) => {
  const existing = await captainRepo.findByUserId(userId);
  if (existing) throw new Error('Captain already registered');
  const Captain = require('./captain.model');
  const captain = new Captain({
    userId,
    vehicleType: data.vehicleType,
    vehicleModel: data.vehicleModel,
    plateNumber: data.plateNumber,
    status: 'pending_review',
  });
  return captainRepo.saveDoc(captain);
};

const getCaptainStatus = async (userId) => {
  const captain = await captainRepo.findByUserId(userId);
  if (!captain) return { status: 'not_registered' };
  return { status: captain.status, rejectionReason: captain.rejectionReason };
};

const toggleOnline = async (userId, isOnline) => {
  const captain = await captainRepo.findByUserId(userId);
  if (!captain) throw new Error('Captain not found');
  if (captain.status !== 'approved') throw new Error('Captain not approved');
  return captainRepo.updateByUserId(userId, { isOnline });
};

const getNearbyDrivers = async (lat, lng, radiusKm = 5) => {
  const captains = await captainRepo.findNearby(lng, lat, radiusKm);
  return captains.map(_formatCaptainForPassenger);
};

const approveCaptain = async (captainId) => {
  const captain = await captainRepo.findById(captainId);
  if (!captain) throw new Error('Captain not found');
  captain.status = 'approved';
  captain.rejectionReason = null;
  await captainRepo.saveDoc(captain);
  await userRepo.updateById(captain.userId, { role: 'captain' });
  return captain;
};

const rejectCaptain = async (captainId, reason) => {
  const captain = await captainRepo.findById(captainId);
  if (!captain) throw new Error('Captain not found');
  captain.status = 'rejected';
  captain.rejectionReason = reason;
  return captainRepo.saveDoc(captain);
};

const updateLocation = async (userId, lat, lng) => {
  const captain = await captainRepo.findByUserId(userId);
  if (!captain) throw new Error('Captain not found');
  return captainRepo.updateByUserId(userId, {
    location: { type: 'Point', coordinates: [lng, lat] },
    lastLocationAt: new Date(),
  });
};

const updatePersonal = async (userId, data) => {
  const captain = await captainRepo.findByUserId(userId);
  if (!captain) throw new Error('Captain not found');
  const { nationalId, address, governorate, dateOfBirth } = data;
  if (nationalId !== undefined) captain.documents.nationalId = nationalId;
  if (address !== undefined) captain.documents.address = address;
  if (governorate !== undefined) captain.documents.governorate = governorate;
  if (dateOfBirth !== undefined) captain.documents.dateOfBirth = dateOfBirth;
  return captainRepo.saveDoc(captain);
};

const updateVehicle = async (userId, data) => {
  const captain = await captainRepo.findByUserId(userId);
  if (!captain) throw new Error('Captain not found');
  const { vehicleType, vehicleModel, plateNumber, vehicleColor } = data;
  if (vehicleType) captain.vehicleType = vehicleType;
  if (vehicleModel) captain.vehicleModel = vehicleModel;
  if (plateNumber) captain.plateNumber = plateNumber;
  if (vehicleColor) captain.vehicleColor = vehicleColor;
  return captainRepo.saveDoc(captain);
};

const updateSingleDocument = async (userId, type, fileUrl) => {
  const captain = await captainRepo.findByUserId(userId);
  if (!captain) throw new Error('Captain not found');
  captain.documents[type] = fileUrl;
  return captainRepo.saveDoc(captain);
};

// -------------------- helpers --------------------
function _formatCaptainForPassenger(c) {
  return {
    captainId: c._id.toString(),
    name: c.userId?.name,
    phone: c.userId?.phone || '',
    avatar: c.userId?.avatar,
    vehicleType: c.vehicleType,
    vehicleModel: c.vehicleModel,
    vehicleColor: c.vehicleColor || '',
    plateNumber: c.plateNumber,
    lat: c.location?.coordinates?.[1] ?? 0,
    lng: c.location?.coordinates?.[0] ?? 0,
    heading: c.heading ?? 0,
    rating: c.rating ?? 0,
    totalTrips: c.totalTrips ?? 0,
  };
}

module.exports = {
  registerCaptain,
  getCaptainStatus,
  toggleOnline,
  getNearbyDrivers,
  approveCaptain,
  rejectCaptain,
  updateLocation,
  updatePersonal,
  updateVehicle,
  updateSingleDocument,
};
