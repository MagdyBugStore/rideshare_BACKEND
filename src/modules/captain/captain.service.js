const Captain = require('./captain.model');
const User = require('../user/user.model');

const registerCaptain = async (userId, data) => {
  const existing = await Captain.findOne({ userId });
  if (existing) throw new Error('Captain profile already exists');

  const captain = await Captain.create({
    userId,
    vehicleType: data.vehicleType,
    vehicleModel: data.vehicleModel,
    plateNumber: data.plateNumber,
  });

  await User.findByIdAndUpdate(userId, { role: 'captain' });
  return captain;
};

const uploadDocuments = async (captainId, files) => {
  const captain = await Captain.findOne({ userId: captainId });
  if (!captain) throw new Error('Captain not found');

  const updates = {};
  if (files.nationalId) updates['documents.nationalId'] = files.nationalId[0].path;
  if (files.driverLicense) updates['documents.driverLicense'] = files.driverLicense[0].path;
  if (files.vehicleLicense) updates['documents.vehicleLicense'] = files.vehicleLicense[0].path;

  await Captain.updateOne({ _id: captain._id }, { $set: updates });
  return { message: 'Documents uploaded successfully' };
};

const getCaptainStatus = async (userId) => {
  const captain = await Captain.findOne({ userId }).select('status rejectionReason');
  if (!captain) return { status: 'not_registered' };
  return { status: captain.status, rejectionReason: captain.rejectionReason };
};

const approveCaptain = async (captainId, adminId) => {
  const captain = await Captain.findById(captainId);
  if (!captain) throw new Error('Captain not found');
  captain.status = 'approved';
  captain.rejectionReason = null;
  await captain.save();
  return captain;
};

const rejectCaptain = async (captainId, reason) => {
  const captain = await Captain.findById(captainId);
  if (!captain) throw new Error('Captain not found');
  captain.status = 'rejected';
  captain.rejectionReason = reason;
  await captain.save();
  return captain;
};

const getNearbyDrivers = async (lat, lng, radius = 3) => {
  const captains = await Captain.find({
    status: 'approved',
    isOnline: true,
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: radius * 1000,
      },
    },
  }).populate('userId', 'name avatar').lean();

  return captains.map(c => ({
    id: c._id,
    userId: c.userId._id,
    name: c.userId.name,
    avatar: c.userId.avatar,
    vehicleType: c.vehicleType,
    vehicleModel: c.vehicleModel,
    plateNumber: c.plateNumber,
    rating: c.rating,
    totalTrips: c.totalTrips,
    location: c.location.coordinates,
  }));
};

const toggleOnline = async (userId, isOnline) => {
  const captain = await Captain.findOne({ userId });
  if (!captain) throw new Error('Captain not found');
  if (captain.status !== 'approved') throw new Error('Captain not approved');
  captain.isOnline = isOnline;
  await captain.save();
  return captain;
};

module.exports = {
  registerCaptain,
  uploadDocuments,
  getCaptainStatus,
  approveCaptain,
  rejectCaptain,
  getNearbyDrivers,
  toggleOnline,
};