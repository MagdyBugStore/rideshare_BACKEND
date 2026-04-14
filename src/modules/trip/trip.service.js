const Trip = require('./trip.model');
const Captain = require('../captain/captain.model');
const { calcFare } = require('../../utils/fare.util');

const createTrip = async (passengerId, captainId, startLocation) => {
  const captain = await Captain.findById(captainId);
  if (!captain || captain.status !== 'approved') throw new Error('Captain not available');
  const trip = await Trip.create({
    passengerId,
    captainId,
    startLocation,
    status: 'pending',
  });
  return trip;
};

const confirmStart = async (tripId, userId, role) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('Trip not found');
  if (trip.status !== 'pending') throw new Error('Trip already started or ended');

  if (role === 'passenger') trip.passengerConfirmedStart = true;
  else if (role === 'captain') trip.captainConfirmedStart = true;

  if (trip.passengerConfirmedStart && trip.captainConfirmedStart) {
    trip.status = 'active';
    trip.startedAt = new Date();
  }
  await trip.save();
  return trip;
};

const requestEndTrip = async (tripId, userId, role) => {
  const trip = await Trip.findById(tripId);
  if (!trip || trip.status !== 'active') throw new Error('Trip not active');
  trip.endRequestedBy = role;
  await trip.save();
  return trip;
};

const confirmEndTrip = async (tripId, userId, role, distanceKm) => {
  const trip = await Trip.findById(tripId);
  if (!trip || trip.status !== 'active') throw new Error('Trip not active');

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
  } else {
    await trip.save();
  }
  return trip;
};

const cancelTrip = async (tripId, userId, reason) => {
  const trip = await Trip.findById(tripId);
  if (!trip || trip.status !== 'pending') throw new Error('Cannot cancel');
  trip.status = 'cancelled';
  trip.cancellationReason = reason;
  await trip.save();
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