const tripRepo = require('./trip.repository');
const captainRepo = require('../captain/captain.repository');
const userRepo = require('../user/user.repository');
const { calcFareBreakdown } = require('../../utils/fare.util');
const { emitToUser, emitToTrip } = require('../../socket');
const logger = require('../../config/logger');

const ACTIVE_STATUSES = ['searching', 'accepted', 'onTheWay', 'arrived', 'started'];

// ── Passenger: create trip ────────────────────────────────────────────
const createTrip = async (passengerId, captainId, startLocation) => {
  const captain = await captainRepo.findById(captainId);
  if (!captain || captain.status !== 'approved') throw new Error('Captain not available');
  if (!captain.isOnline) throw new Error('Captain is offline');
  if (captain.isOnTrip) throw new Error('Captain is already on a trip');

  const trip = await tripRepo.create({ passengerId, captainId: captain._id, startLocation });

  // Resolve passenger name for the notification payload
  const passenger = await userRepo.findById(passengerId);

  // Notify captain — they are identified by their User._id on the socket
  emitToUser(captain.userId.toString(), 'trip:request:incoming', {
    tripId:    trip._id.toString(),
    passenger: { id: passengerId.toString(), name: passenger?.name, avatar: passenger?.avatar },
    startLocation,
  });

  logger.info(`[Trip] created ${trip._id} | passenger=${passengerId} | captain=${captainId}`);
  return trip;
};

// ── Captain: accept ───────────────────────────────────────────────────
const acceptTrip = async (tripId, captainUserId) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  const captain = await captainRepo.findByUserIdPopulated(captainUserId);
  if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
  if (!trip.canTransitionTo('accepted')) throw new Error(`Cannot accept from status: ${trip.status}`);

  trip.status = 'accepted';
  trip.acceptedAt = new Date();
  await tripRepo.saveDoc(trip);

  await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });

  emitToUser(trip.passengerId.toString(), 'trip:accepted', {
    tripId: trip._id.toString(),
    captain: {
      captainId:    captain._id.toString(),
      name:         captain.userId?.name,
      avatar:       captain.userId?.avatar,
      vehicleType:  captain.vehicleType,
      vehicleModel: captain.vehicleModel,
      vehicleColor: captain.vehicleColor,
      plateNumber:  captain.plateNumber,
      rating:       captain.rating,
    },
  });

  logger.info(`[Trip] ${tripId} accepted by ${captainUserId}`);
  return tripRepo.findByIdPopulated(tripId);
};

// ── Captain: status transitions (onTheWay / arrived / started) ────────
const _captainTransition = async (tripId, captainUserId, newStatus) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  const captain = await captainRepo.findByUserId(captainUserId);
  if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
  if (!trip.canTransitionTo(newStatus)) throw new Error(`Cannot transition to ${newStatus} from ${trip.status}`);

  const tsField = { onTheWay: 'onTheWayAt', arrived: 'arrivedAt', started: 'startedAt' }[newStatus];
  trip.status = newStatus;
  if (tsField) trip[tsField] = new Date();
  await tripRepo.saveDoc(trip);

  emitToTrip(tripId, 'trip:status:update', { tripId, status: newStatus });
  logger.info(`[Trip] ${tripId} → ${newStatus}`);
  return trip;
};

const markOnTheWay = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'onTheWay');
const markArrived  = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'arrived');
const startTrip    = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'started');

// ── Captain: end trip ─────────────────────────────────────────────────
const endTrip = async (tripId, captainUserId, distanceKm) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  const captain = await captainRepo.findByUserId(captainUserId);
  if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
  if (!trip.canTransitionTo('ended')) throw new Error(`Cannot end from status: ${trip.status}`);

  const fare = calcFareBreakdown(distanceKm);
  trip.status = 'ended';
  trip.endedAt = new Date();
  trip.distanceKm = distanceKm;
  trip.totalFare = fare.total;
  trip.fareBreakdown = fare;
  await tripRepo.saveDoc(trip);

  await captainRepo.updateByUserId(captainUserId, { isOnTrip: false, $inc: { totalTrips: 1 } });

  emitToTrip(tripId, 'trip:status:update', { tripId, status: 'ended', fare });
  logger.info(`[Trip] ${tripId} ended | km=${distanceKm} | fare=${fare.total}`);
  return trip;
};

// ── Either party: cancel ──────────────────────────────────────────────
const cancelTrip = async (tripId, userId, role, reason) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error('Trip not found');
  if (!trip.canTransitionTo('cancelled')) throw new Error('Cannot cancel trip in current state');

  if (role === 'passenger') {
    if (trip.passengerId.toString() !== userId.toString()) throw new Error('Unauthorized');
  } else if (role === 'captain') {
    const captain = await captainRepo.findByUserId(userId);
    if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
    await captainRepo.updateByUserId(userId, { isOnTrip: false });
  }

  trip.status = 'cancelled';
  trip.cancelledAt = new Date();
  trip.cancellationReason = reason || null;
  trip.cancelledBy = role;
  await tripRepo.saveDoc(trip);

  emitToTrip(tripId, 'trip:cancelled', { tripId, reason: reason || null, cancelledBy: role });
  logger.info(`[Trip] ${tripId} cancelled by ${role}`);
  return trip;
};

// ── GET /trips/current ────────────────────────────────────────────────
const getCurrentTrip = async (userId, role) => {
  if (role === 'passenger') {
    return tripRepo.findOnePopulated({ passengerId: userId, status: { $in: ACTIVE_STATUSES } });
  }
  if (role === 'captain') {
    const captain = await captainRepo.findByUserId(userId);
    if (!captain) return null;
    return tripRepo.findOnePopulated({ captainId: captain._id, status: { $in: ACTIVE_STATUSES } });
  }
  return null;
};

const getTrip = (tripId) => tripRepo.findByIdPopulated(tripId);

module.exports = {
  createTrip,
  acceptTrip,
  markOnTheWay,
  markArrived,
  startTrip,
  endTrip,
  cancelTrip,
  getCurrentTrip,
  getTrip,
};
