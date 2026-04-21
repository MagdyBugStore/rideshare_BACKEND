const Trip = require('./trip.model');
const Captain = require('../captain/captain.model');
const { calcFare } = require('../../utils/fare.util');
const { emitToTrip } = require('../../socket'); 
const mongoose = require('mongoose');

const createTrip = async (passengerId, captainId, startLocation) => {
  if (!mongoose.Types.ObjectId.isValid(captainId)) {
    throw new Error('معرف الكابتن غير صالح');
  }

  const captain = await Captain.findById(captainId);
  if (!captain || captain.status !== 'approved') {
    throw new Error('الكابتن غير متاح');
  }
  if (!captain.isOnline) {
    throw new Error('الكابتن غير متصل حالياً');
  }

  const trip = await Trip.create({
    passengerId,
    captainId: captain._id,
    startLocation,
    status: 'pending',
  });
  return trip;
};

const confirmStart = async (tripId, userId, role) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('الرحلة غير موجودة');
  if (trip.status !== 'pending') throw new Error('الرحلة ليست في حالة انتظار البدء');

  const isPassenger = trip.passengerId.toString() === userId;
  const captain = await Captain.findById(trip.captainId);
  const isCaptain = captain.userId.toString() === userId;

  if (role === 'passenger' && !isPassenger) throw new Error('غير مصرح لك كراكب');
  if (role === 'captain' && !isCaptain) throw new Error('غير مصرح لك ككابتن');

  if (role === 'passenger') trip.passengerConfirmedStart = true;
  else if (role === 'captain') trip.captainConfirmedStart = true;

  // ✨ في بيئة التطوير: إذا أكد الراكب، اعتبر الكابتن مؤكداً تلقائياً
  if (process.env.NODE_ENV === 'development' && role === 'passenger') {
    trip.captainConfirmedStart = true;
  }

  if (trip.passengerConfirmedStart && trip.captainConfirmedStart) {
    trip.status = 'active';
    trip.startedAt = new Date();
    await trip.save();
    emitToTrip(tripId, 'trip:started', trip);
  } else {
    await trip.save();
  }
  return trip;
};

const requestEndTrip = async (tripId, userId, role) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('الرحلة غير موجودة');
  if (trip.status !== 'active') throw new Error('الرحلة غير نشطة');

  const isPassenger = trip.passengerId.toString() === userId;
  const captain = await Captain.findById(trip.captainId);
  const isCaptain = captain.userId.toString() === userId;

  if (role === 'passenger' && !isPassenger) throw new Error('غير مصرح لك كراكب');
  if (role === 'captain' && !isCaptain) throw new Error('غير مصرح لك ككابتن');

  // ✅ لا يمكن تكرار الطلب من نفس الطرف دون رد
  if (trip.endRequestedBy === role) throw new Error('أنت بالفعل طلبت إنهاء الرحلة');

  trip.endRequestedBy = role;
  await trip.save();

  // ✅ إشعار الطرف الآخر بطلب إنهاء
  emitToTrip(tripId, 'trip:end-requested', { requestedBy: role });

  return trip;
};

const confirmEndTrip = async (tripId, userId, role, distanceKm) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('الرحلة غير موجودة');
  if (trip.status !== 'active') throw new Error('الرحلة غير نشطة');

  const isPassenger = trip.passengerId.toString() === userId;
  const captain = await Captain.findById(trip.captainId);
  const isCaptain = captain.userId.toString() === userId;

  if (role === 'passenger' && !isPassenger) throw new Error('غير مصرح لك كراكب');
  if (role === 'captain' && !isCaptain) throw new Error('غير مصرح لك ككابتن');

  // ✅ التحقق من وجود طلب إنهاء من الطرف الآخر
  if (!trip.endRequestedBy || trip.endRequestedBy === role) {
    throw new Error('لا يمكن تأكيد إنهاء الرحلة قبل طلب الطرف الآخر');
  }

  if (role === 'passenger') trip.passengerConfirmedEnd = true;
  else if (role === 'captain') trip.captainConfirmedEnd = true;

  if (trip.passengerConfirmedEnd && trip.captainConfirmedEnd) {
    trip.status = 'ended';
    trip.endedAt = new Date();
    trip.distanceKm = distanceKm;
    trip.totalFare = calcFare(distanceKm);
    await trip.save();

    // تحديث إحصائيات الكابتن
    await Captain.findByIdAndUpdate(trip.captainId, {
      $inc: { totalTrips: 1 },
    });

    // ✅ إشعار الطرفين بانتهاء الرحلة
    emitToTrip(tripId, 'trip:ended', trip);
  } else {
    await trip.save();
  }
  return trip;
};

const cancelTrip = async (tripId, userId, reason) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('الرحلة غير موجودة');
  if (trip.status !== 'pending') throw new Error('لا يمكن إلغاء الرحلة في هذه الحالة');

  const isPassenger = trip.passengerId.toString() === userId;
  const captain = await Captain.findById(trip.captainId);
  const isCaptain = captain.userId.toString() === userId;

  if (!isPassenger && !isCaptain) throw new Error('غير مصرح لك');

  trip.status = 'cancelled';
  trip.cancellationReason = reason;
  await trip.save();
  emitToTrip(tripId, 'trip:cancelled', trip);
  return trip;
};

const getTrip = async (tripId) => {
  return await Trip.findById(tripId)
    .populate('passengerId', 'name phone avatar')
    .populate('captainId', 'userId vehicleType vehicleModel plateNumber rating totalTrips');
};

module.exports = {
  createTrip,
  confirmStart,
  requestEndTrip,
  confirmEndTrip,
  cancelTrip,
  getTrip,
};