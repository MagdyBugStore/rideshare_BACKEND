const Captain = require('./captain.model');
const User = require('../user/user.model');
// ---------- Register Captain (called from controller) ----------
const registerCaptain = async (userId, data) => {
  const existing = await Captain.findOne({ userId });
  if (existing) throw new Error('Captain already registered');

  const captain = await Captain.create({
    userId,
    vehicleType: data.vehicleType,
    vehicleModel: data.vehicleModel,
    plateNumber: data.plateNumber,
    status: 'pending_review',
  });
  return captain;
};

// ---------- Upload Documents ----------
const uploadDocuments = async (userId, files) => {
  const captain = await Captain.findOne({ userId });
  if (!captain) throw new Error('Captain not found');

  const updates = {};
  if (files.nationalId) updates['documents.nationalId'] = files.nationalId[0].path;
  if (files.driverLicense) updates['documents.driverLicense'] = files.driverLicense[0].path;
  if (files.vehicleLicense) updates['documents.vehicleLicense'] = files.vehicleLicense[0].path;

  await Captain.updateOne({ _id: captain._id }, { $set: updates });
  return { message: 'Documents uploaded successfully' };
};

// ---------- Get Captain Status ----------
const getCaptainStatus = async (userId) => {
  const captain = await Captain.findOne({ userId }).select('status rejectionReason');
  if (!captain) return { status: 'not_registered' };
  return { status: captain.status, rejectionReason: captain.rejectionReason };
};

// ---------- Approve / Reject (Admin) ----------
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

// ---------- Toggle Online Status ----------
const toggleOnline = async (userId, isOnline) => {
  const captain = await Captain.findOne({ userId });
  if (!captain) throw new Error('Captain not found');
  if (captain.status !== 'approved') throw new Error('Captain not approved');
  captain.isOnline = isOnline;
  await captain.save();
  return captain;
};

const { generateMockDrivers } = require('../../utils/mock.util');

// ---------- Nearby Drivers (Geo) ----------
const getNearbyDrivers = async (lat, lng, radius = 3) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🧪 Development mode: returning mock drivers');
    var mockDrivers = generateMockDrivers(parseFloat(lat), parseFloat(lng));
    return mockDrivers;
  }

  const captains = await Captain.find({
    status: 'approved',
    isOnline: true,
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: radius * 1000,
      },
    },
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
    lat: c.location?.coordinates?.[1] || 0,
    lng: c.location?.coordinates?.[0] || 0,
    status: c.isOnline ? 'available' : 'busy',
    rating: c.rating || 0,
    total_trips: c.totalTrips || 0,
  }));
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