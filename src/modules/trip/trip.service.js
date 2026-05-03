const tripRepo = require('./trip.repository');
const captainRepo = require('../captain/captain.repository');
const userRepo = require('../user/user.repository');
const { calcFareBreakdown } = require('../../utils/fare.util');
const { haversineDistance } = require('../../utils/distance.util');
const { emitToUser, emitToTrip } = require('../../socket');
const notificationService = require('../notification/notification.service');
const logger = require('../../config/logger');

const ACTIVE_STATUSES = ['searching', 'accepted', 'onTheWay', 'arrived', 'started'];

const DISPATCH_TIMEOUT_MS = 15000; // 15s per captain
const MAX_DISPATCH_ATTEMPTS = 5;   // max captains before giving up
const EXPAND_RADIUS_KM = 10;       // expanded radius after initial failure

// In-memory registry of pending dispatch promises
// captainUserId → { resolve, reject, timer }
const _pending = new Map();

// ── Passenger: initiate trip search (dispatch loop) ──────────────────
const searchTrip = async (passengerId, startLocation, carType) => {
  const captains = await captainRepo.findNearby(startLocation.lng, startLocation.lat, 5, carType);
  if (captains.length === 0) {
    throw Object.assign(new Error('NO_CAPTAINS_NEARBY'), { status: 404 });
  }

  const passenger = await userRepo.findById(passengerId);
  const trip = await tripRepo.create({ passengerId, carType, startLocation, status: 'searching' });

  // Fire and forget — dispatch runs asynchronously, passenger waits for socket events
  _dispatchLoop(trip, captains, passenger).catch((err) =>
    logger.error('[Trip Dispatch] unhandled error', err)
  );

  return trip;
};

async function _dispatchLoop(trip, captains, passenger) {
  const toDispatch = captains.slice(0, MAX_DISPATCH_ATTEMPTS);

  for (const captain of toDispatch) {
    const freshTrip = await tripRepo.findById(trip._id);
    if (!freshTrip || freshTrip.status !== 'searching') return; // Passenger cancelled

    const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
    if (!captainUserId) continue;

    emitToUser(captainUserId, 'trip:request:incoming', {
      tripId:    trip._id.toString(),
      passenger: { id: passenger._id.toString(), name: passenger.name, avatar: passenger.avatar },
      startLocation: trip.startLocation,
      carType:   trip.carType,
    });

    const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
    if (!result?.accepted) continue;

    // Attempt atomic lock — prevents race conditions if two captains accept simultaneously
    const locked = await tripRepo.atomicAccept(trip._id, captain._id);
    if (!locked) continue; // Another captain was faster (shouldn't happen but guards against it)

    await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });
    const populated = await captainRepo.findByUserIdPopulated(captainUserId);

    emitToUser(passenger._id.toString(), 'trip:accepted', {
      tripId: trip._id.toString(),
      captain: {
        captainId:    captain._id.toString(),
        name:         captain.userId?.name,
        avatar:       captain.userId?.avatar,
        vehicleType:  captain.vehicleType,
        vehicleModel: captain.vehicleModel,
        vehicleColor: captain.vehicleColor,
        plateNumber:  captain.plateNumber,
        rating:       captain.rating ?? 0,
      },
    });

    notificationService.notify(passenger._id, {
      title: 'تم قبول رحلتك ✓',
      body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
      data: { type: 'trip:accepted', tripId: trip._id.toString() },
    }).catch(() => {});

    logger.info(`[Trip Dispatch] ${trip._id} accepted by captain ${captainUserId}`);
    return;
  }

  // Initial radius failed — try expanded radius (once, up to 3 more captains)
  const expanded = await captainRepo.findNearby(
    trip.startLocation.lng, trip.startLocation.lat, EXPAND_RADIUS_KM, trip.carType
  );
  const seenIds = new Set(toDispatch.map((c) => c._id.toString()));
  const newCaptains = expanded.filter((c) => !seenIds.has(c._id.toString())).slice(0, 3);

  for (const captain of newCaptains) {
    const freshTrip = await tripRepo.findById(trip._id);
    if (!freshTrip || freshTrip.status !== 'searching') return;

    const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
    if (!captainUserId) continue;

    emitToUser(captainUserId, 'trip:request:incoming', {
      tripId:    trip._id.toString(),
      passenger: { id: passenger._id.toString(), name: passenger.name, avatar: passenger.avatar },
      startLocation: trip.startLocation,
      carType:   trip.carType,
    });

    const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
    if (!result?.accepted) continue;

    const locked = await tripRepo.atomicAccept(trip._id, captain._id);
    if (!locked) continue;

    await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });

    emitToUser(passenger._id.toString(), 'trip:accepted', {
      tripId:  trip._id.toString(),
      captain: {
        captainId:    captain._id.toString(),
        name:         captain.userId?.name,
        avatar:       captain.userId?.avatar,
        vehicleType:  captain.vehicleType,
        vehicleModel: captain.vehicleModel,
        vehicleColor: captain.vehicleColor,
        plateNumber:  captain.plateNumber,
        rating:       captain.rating ?? 0,
      },
    });

    logger.info(`[Trip Dispatch] ${trip._id} accepted (expanded radius) by ${captainUserId}`);
    return;
  }

  // No captain found — cancel trip and notify passenger
  const finalTrip = await tripRepo.findById(trip._id);
  if (finalTrip?.status === 'searching') {
    finalTrip.status = 'cancelled';
    finalTrip.cancellationReason = 'no_captain_found';
    finalTrip.cancelledBy = null;
    finalTrip.cancelledAt = new Date();
    await tripRepo.saveDoc(finalTrip);
  }
  emitToUser(passenger._id.toString(), 'trip:no_captain_found', { tripId: trip._id.toString() });
  logger.info(`[Trip Dispatch] ${trip._id} — no captain found`);
}

function _awaitCaptainResponse(captainUserId) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      _pending.delete(captainUserId);
      reject(new Error('TIMEOUT'));
    }, DISPATCH_TIMEOUT_MS);
    _pending.set(captainUserId, { resolve, reject, timer });
  });
}

// Called from trip.socket.js when captain emits trip:request:accept
const captainAccepted = (captainUserId) => {
  const entry = _pending.get(captainUserId);
  if (!entry) return false;
  clearTimeout(entry.timer);
  _pending.delete(captainUserId);
  entry.resolve({ accepted: true });
  return true;
};

// Called from trip.socket.js when captain emits trip:request:reject
const captainRejected = (captainUserId) => {
  const entry = _pending.get(captainUserId);
  if (!entry) return false;
  clearTimeout(entry.timer);
  _pending.delete(captainUserId);
  entry.resolve({ accepted: false });
  return true;
};

// ── Passenger: create trip (direct — used for map-tap flow) ──────────
const createTrip = async (passengerId, captainId, startLocation, carType = 'car') => {
  const captain = await captainRepo.findById(captainId);
  if (!captain || captain.status !== 'approved') throw new Error('Captain not available');
  if (!captain.isOnline) throw new Error('Captain is offline');
  if (captain.isOnTrip) throw new Error('Captain is already on a trip');

  const trip = await tripRepo.create({ passengerId, captainId: captain._id, carType: carType || captain.vehicleType, startLocation });

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

  // Push passenger when captain arrives
  if (newStatus === 'arrived') {
    notificationService.notify(trip.passengerId, {
      title: 'الكابتن وصل 🚗',
      body: 'الكابتن في موقعك، توجه إليه',
      data: { type: 'captain:arrived', tripId },
    }).catch(() => {});
  }

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

  const fare = calcFareBreakdown(distanceKm, trip.carType);
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

  // Notify the OTHER party
  const otherPartyId = role === 'passenger'
    ? trip.captainId && (await captainRepo.findById(trip.captainId))?.userId
    : trip.passengerId;
  if (otherPartyId) {
    notificationService.notify(otherPartyId, {
      title: 'تم إلغاء الرحلة',
      body: role === 'passenger' ? 'قام الراكب بإلغاء الرحلة' : 'قام الكابتن بإلغاء الرحلة',
      data: { type: 'trip:cancelled', tripId },
    }).catch(() => {});
  }

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

// ── POST /trips/estimate ──────────────────────────────────────────────
const estimateFare = (startLat, startLng, endLat, endLng, carType = 'car') => {
  const distanceKm = haversineDistance(startLat, startLng, endLat, endLng);
  return { distanceKm: Math.round(distanceKm * 100) / 100, ...calcFareBreakdown(distanceKm, carType) };
};

module.exports = {
  searchTrip,
  estimateFare,
  captainAccepted,
  captainRejected,
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
