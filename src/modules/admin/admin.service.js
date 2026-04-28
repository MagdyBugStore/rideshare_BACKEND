const User = require('../user/user.model');
const Trip = require('../trip/trip.model');
const Captain = require('../captain/captain.model');

// ========== إدارة المستخدمين ==========
const getAllUsers = async () => {
  return await User.find({}).select('-refreshToken -otpCode -otpExpiresAt');
};

const updateUser = async (userId, updateData) => {
  const allowedUpdates = ['name', 'email', 'phone', 'role', 'isActive'];
  const updates = {};
  Object.keys(updateData).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = updateData[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    updates,
    { new: true, runValidators: true }
  ).select('-refreshToken -otpCode -otpExpiresAt');

  if (!user) throw new Error('المستخدم غير موجود');
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('المستخدم غير موجود');

  // إذا كان المستخدم كابتن، نحذف سجل الكابتن أولاً
  if (user.role === 'captain') {
    await Captain.deleteOne({ userId: user._id });
  }

  // حذف رحلات المستخدم كراكب
  await Trip.deleteMany({ passengerId: user._id });

  await user.deleteOne();
  return { message: 'تم حذف المستخدم بنجاح' };
};

// ========== إدارة الكباتن ==========
const getAllCaptains = async () => {
  return await Captain.find({})
    .populate('userId', 'name email phone avatar')
    .sort({ createdAt: -1 });
};

const createCaptain = async (captainData) => {
  const { userId, vehicleType, vehicleModel, plateNumber, vehicleColor, status } = captainData;

  // التحقق من وجود المستخدم
  const user = await User.findById(userId);
  if (!user) throw new Error('المستخدم غير موجود');

  // التحقق من عدم وجود كابتن مسبق
  const existing = await Captain.findOne({ userId });
  if (existing) throw new Error('يوجد كابتن مسجل مسبقاً لهذا المستخدم');

  const captain = await Captain.create({
    userId,
    vehicleType,
    vehicleModel,
    plateNumber,
    vehicleColor: vehicleColor || '',
    status: status || 'pending_review',
  });

  // إذا كان الكابتن موافق عليه، نحدث دور المستخدم
  if (status === 'approved') {
    await User.findByIdAndUpdate(userId, { role: 'captain' });
  }

  return captain;
};

const updateCaptain = async (captainId, updateData) => {
  const allowedUpdates = [
    'vehicleType',
    'vehicleModel',
    'plateNumber',
    'vehicleColor',
    'status',
    'isOnline',
    'location',
    'rating',
    'totalTrips'
  ];
  const updates = {};
  Object.keys(updateData).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = updateData[key];
    }
  });

  const captain = await Captain.findByIdAndUpdate(
    captainId,
    updates,
    { new: true, runValidators: true }
  ).populate('userId', 'name email phone');

  if (!captain) throw new Error('الكابتن غير موجود');

  // إذا تم تغيير الحالة إلى approved، نحدث دور المستخدم
  if (updateData.status === 'approved') {
    await User.findByIdAndUpdate(captain.userId, { role: 'captain' });
  }

  return captain;
};

const deleteCaptain = async (captainId) => {
  const captain = await Captain.findById(captainId);
  if (!captain) throw new Error('الكابتن غير موجود');

  // حذف الرحلات المرتبطة بالكابتن
  await Trip.deleteMany({ captainId: captain._id });

  await captain.deleteOne();
  return { message: 'تم حذف الكابتن بنجاح' };
};

// ========== الكباتن المعلقون ==========
const getPendingCaptains = async () => {
  return await Captain.find({ status: 'pending_review' })
    .populate('userId', 'name phone email')
    .sort({ createdAt: -1 });
};

const approveCaptain = async (captainId) => {
  const captain = await Captain.findById(captainId);
  if (!captain) throw new Error('الكابتن غير موجود');

  captain.status = 'approved';
  captain.applicationStatus = 'approved';
  captain.rejectionReason = null;
  await captain.save();

  // تحديث دور المستخدم إلى 'captain'
  await User.findByIdAndUpdate(captain.userId, { role: 'captain' });

  return captain;
};

const rejectCaptain = async (captainId, reason) => {
  const captain = await Captain.findById(captainId);
  if (!captain) throw new Error('الكابتن غير موجود');

  captain.status = 'rejected';
  captain.rejectionReason = reason || 'تم الرفض من قبل الإدارة';
  await captain.save();

  return captain;
};

// ========== إدارة الرحلات ==========
const createTrip = async (tripData) => {
  const { passengerId, captainId, startLocation, distanceKm, totalFare } = tripData;

  const passenger = await User.findById(passengerId);
  if (!passenger) throw new Error('الراكب غير موجود');

  const captain = await Captain.findById(captainId);
  if (!captain) throw new Error('الكابتن غير موجود');

  const trip = await Trip.create({
    passengerId,
    captainId,
    startLocation,
    distanceKm: distanceKm || 0,
    totalFare: totalFare || 0,
    status: 'pending',
  });

  return trip;
};

const deleteTrip = async (tripId) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('الرحلة غير موجودة');
  await trip.deleteOne();
  return { message: 'تم حذف الرحلة بنجاح' };
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllCaptains,
  createCaptain,
  updateCaptain,
  deleteCaptain,
  getPendingCaptains,
  approveCaptain,
  rejectCaptain,
  createTrip,
  deleteTrip,
};