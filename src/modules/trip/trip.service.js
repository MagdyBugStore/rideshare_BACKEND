const tripRepo = require('./trip.repository');
const captainRepo = require('../captain/captain.repository');
const userRepo = require('../user/user.repository');
const { calcFareBreakdown, getFareConfig } = require('../../utils/fare.util');
const { getPolyline } = require('../routes/routes.service');
const { haversineDistance } = require('../../utils/distance.util');
const { emitToUser, emitToTrip } = require('../../socket');
const notificationService = require('../notification/notification.service');
const logger = require('../../config/logger');

const ACTIVE_STATUSES = [
  'searching', 'pending_captain',
  'accepted',
  'on_the_way', 'onTheWay',
  'arrived',
  'started', 'in_progress',
];

const DISPATCH_TIMEOUT_MS = 120000; // 2 minutes per captain
const MAX_DISPATCH_ATTEMPTS = 5;   // max captains before giving up
const EXPAND_RADIUS_KM = 10;       // expanded radius after initial failure

// In-memory registry of pending dispatch promises
// captainUserId → { resolve, reject, timer }
const _pending = new Map();

// ── Passenger: initiate trip search (dispatch loop) ──────────────────
const searchTrip = async (passengerId, startLocation, endLocation, carType) => {
  // Idempotency: never create a duplicate active trip for the same passenger.
  // If one already exists, return it so the client can join its room.
  const existing = await tripRepo.findOne({ passengerId, status: { $in: ACTIVE_STATUSES } });
  if (existing) {
    logger.warn(`[searchTrip] Passenger ${passengerId} already has active trip ${existing._id} — returning existing`);
    return existing;
  }

  // Retry path: reuse the most recent no_captain_found trip instead of creating a new document.
  // This keeps a single trip document per passenger journey across retries.
  const failedTrip = await tripRepo.findOne(
    { passengerId, status: 'no_captain_found' },
    { sort: { createdAt: -1 } }
  );
  if (failedTrip) {
    logger.info(`[searchTrip] Retrying dispatch on existing trip ${failedTrip._id} for passenger ${passengerId}`);
    failedTrip.status = 'searching';
    failedTrip.searchStartedAt = new Date();
    failedTrip.cancellationReason = undefined;
    failedTrip.cancelledBy = undefined;
    failedTrip.cancelledAt = undefined;
    await tripRepo.saveDoc(failedTrip);

    const passenger = await userRepo.findById(passengerId);
    const captains = await captainRepo.findNearby(startLocation.lng, startLocation.lat, 5, carType);
    _dispatchLoop(failedTrip, captains, passenger).catch((err) =>
      logger.error('[Trip Dispatch] unhandled error on retry', err)
    );
    return failedTrip;
  }

  const passenger = await userRepo.findById(passengerId);
  const { firstKmFare, extraKmFare } = getFareConfig(carType);

  let polyRoute = '';
  let distanceKm = 0;
  let totalFare = 0;
  let routeDistanceKm = 0;
  let estimatedDurationMins = 0;

  if (endLocation?.lat && endLocation?.lng) {
    try {
      const route = await getPolyline(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng);
      polyRoute = route.encodedPolyline;
      distanceKm = route.distanceKm;
      routeDistanceKm = route.distanceKm;
      estimatedDurationMins = route.durationMins ?? 0;
      totalFare = calcFareBreakdown(distanceKm, carType).total;
    } catch (err) {
      logger.warn('[searchTrip] Route polyline failed:', err.message);
    }
  }

  const trip = await tripRepo.create({
    passengerId, carType,
    startLocation,
    endLocation: endLocation || undefined,
    pickupLocation: {
      lat: startLocation.lat,
      lng: startLocation.lng,
      address: startLocation.address || '',
    },
    dropoffLocation: endLocation?.lat ? {
      lat: endLocation.lat,
      lng: endLocation.lng,
      address: endLocation.address || '',
    } : undefined,
    status: 'searching',
    searchStartedAt: new Date(),
    polyRoute,
    pickupToDestinationPolyline: polyRoute,
    currentPolyline: polyRoute,
    distanceKm, totalFare, firstKmFare, extraKmFare, routeDistanceKm,
    estimatedDurationMins,
  });

  const captains = await captainRepo.findNearby(startLocation.lng, startLocation.lat, 5, carType);

  _dispatchLoop(trip, captains, passenger).catch((err) =>
    logger.error('[Trip Dispatch] unhandled error', err)
  );

  return trip;
};

async function _dispatchLoop(trip, captains, passenger) {
  const toDispatch = captains.slice(0, MAX_DISPATCH_ATTEMPTS);

  console.log(`🔄 [DISPATCH] Starting dispatch loop for trip ${trip._id}`);
  console.log(`🔄 [DISPATCH] Will try ${toDispatch.length} captains initially`);

  for (const captain of toDispatch) {
    const freshTrip = await tripRepo.findById(trip._id);
    if (!freshTrip || freshTrip.status !== 'searching') {
      console.log(`🔄 [DISPATCH] Trip ${trip._id} no longer searching, stopping dispatch`);
      return;
    }

    const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
    if (!captainUserId) {
      console.log(`🔄 [DISPATCH] Captain ${captain._id} has no userId, skipping`);
      continue;
    }

    console.log(`🔄 [DISPATCH] Sending request to captain ${captainUserId}`);

    const routeDist = trip.routeDistanceKm || trip.distanceKm || 0;
    emitToUser(captainUserId, 'trip:request:incoming', {
      tripId: trip._id.toString(),
      passenger: {
        id: passenger._id.toString(),
        name: passenger.name,
        avatar: passenger.avatar,
        phone: passenger.phone,
      },
      startLocation: trip.startLocation,
      endLocation: trip.endLocation,
      carType: trip.carType,
      polyRoute: trip.polyRoute,
      pickupToDestinationPolyline: trip.pickupToDestinationPolyline || trip.polyRoute,
      distanceKm: routeDist,       // pickup→destination route distance
      routeDistanceKm: routeDist,
      totalFare: trip.totalFare,
      firstKmFare: trip.firstKmFare,
      extraKmFare: trip.extraKmFare,
    });

    notificationService.notify(captainUserId, {
      title: 'طلب رحلة جديد 🚖',
      body: `راكب بالقرب منك يطلب رحلة`,
      data: { type: 'trip:request', tripId: trip._id.toString() },
    }).catch(() => { });

    const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
    if (!result?.accepted) {
      console.log(`🔄 [DISPATCH] Captain ${captainUserId} ${result ? 'rejected' : 'timed out'}`);
      continue;
    }

    // Attempt atomic lock — prevents race conditions if two captains accept simultaneously
    const locked = await tripRepo.atomicAccept(trip._id, captain._id);
    if (!locked) {
      console.log(`🔄 [DISPATCH] Atomic accept failed for ${captain._id}, another captain was faster`);
      continue;
    }

    // Record when captain responded (accepted)
    tripRepo.findByIdAndUpdate(trip._id, { $set: { captainRespondedAt: new Date() } }).catch(() => {});

    await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });

    const captainPayload = {
      captainId: captain._id.toString(),
      name: captain.userId?.name,
      avatar: captain.userId?.avatar,
      phone: captain.userId?.phone,
      vehicleType: captain.vehicleType,
      vehicleModel: captain.vehicleModel,
      vehicleColor: captain.vehicleColor,
      plateNumber: captain.plateNumber,
      rating: captain.rating ?? 0,
    };

    emitToUser(passenger._id.toString(), 'trip:accepted', {
      tripId: trip._id.toString(),
      captain: captainPayload,
    });

    // Notify captain so their IncomingRequestScreen can transition to NavigationToPickupScreen
    emitToUser(captainUserId, 'trip:accepted', { tripId: trip._id.toString(), captain: null });

    notificationService.notify(passenger._id, {
      title: 'تم قبول رحلتك ✓',
      body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
      data: { type: 'trip:accepted', tripId: trip._id.toString() },
    }).catch(() => { });

    // Compute and broadcast initial captain→pickup route asynchronously
    _emitInitialRoute(trip._id.toString(), captain, trip.startLocation).catch((err) =>
      logger.warn('[dispatch] Initial route failed:', err.message)
    );

    console.log(`🔄 [DISPATCH] ✅ Trip ${trip._id} accepted by captain ${captainUserId}`);
    return;
  }

  // Initial radius failed — try expanded radius (once, up to 3 more captains)
  console.log(`🔄 [DISPATCH] Initial dispatch failed, trying expanded radius (${EXPAND_RADIUS_KM}km)`);

  const expanded = await captainRepo.findNearby(
    trip.startLocation.lng, trip.startLocation.lat, EXPAND_RADIUS_KM, trip.carType
  );
  const seenIds = new Set(toDispatch.map((c) => c._id.toString()));
  const newCaptains = expanded.filter((c) => !seenIds.has(c._id.toString())).slice(0, 3);

  console.log(`🔄 [DISPATCH] Found ${newCaptains.length} new captains in expanded radius`);

  for (const captain of newCaptains) {
    const freshTrip = await tripRepo.findById(trip._id);
    if (!freshTrip || freshTrip.status !== 'searching') return;

    const captainUserId = captain.userId?._id?.toString() ?? captain.userId?.toString();
    if (!captainUserId) continue;

    console.log(`🔄 [DISPATCH] Sending request (expanded) to captain ${captainUserId}`);

    const routeDistExp = trip.routeDistanceKm || trip.distanceKm || 0;
    emitToUser(captainUserId, 'trip:request:incoming', {
      tripId: trip._id.toString(),
      passenger: {
        id: passenger._id.toString(),
        name: passenger.name,
        avatar: passenger.avatar,
        phone: passenger.phone,
      },
      startLocation: trip.startLocation,
      endLocation: trip.endLocation,
      carType: trip.carType,
      polyRoute: trip.polyRoute,
      pickupToDestinationPolyline: trip.pickupToDestinationPolyline || trip.polyRoute,
      distanceKm: routeDistExp,       // pickup→destination route distance
      routeDistanceKm: routeDistExp,
      totalFare: trip.totalFare,
      firstKmFare: trip.firstKmFare,
      extraKmFare: trip.extraKmFare,
    });

    notificationService.notify(captainUserId, {
      title: 'طلب رحلة جديد 🚖',
      body: `راكب بالقرب منك يطلب رحلة`,
      data: { type: 'trip:request', tripId: trip._id.toString() },
    }).catch(() => { });

    const result = await _awaitCaptainResponse(captainUserId).catch(() => null);
    if (!result?.accepted) continue;

    const locked = await tripRepo.atomicAccept(trip._id, captain._id);
    if (!locked) continue;

    tripRepo.findByIdAndUpdate(trip._id, { $set: { captainRespondedAt: new Date() } }).catch(() => {});

    await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });

    const captainPayloadExpanded = {
      captainId: captain._id.toString(),
      name: captain.userId?.name,
      avatar: captain.userId?.avatar,
      phone: captain.userId?.phone,
      vehicleType: captain.vehicleType,
      vehicleModel: captain.vehicleModel,
      vehicleColor: captain.vehicleColor,
      plateNumber: captain.plateNumber,
      rating: captain.rating ?? 0,
    };

    emitToUser(passenger._id.toString(), 'trip:accepted', {
      tripId: trip._id.toString(),
      captain: captainPayloadExpanded,
    });

    // Notify captain so their IncomingRequestScreen can transition to NavigationToPickupScreen
    emitToUser(captainUserId, 'trip:accepted', { tripId: trip._id.toString(), captain: null });

    notificationService.notify(passenger._id.toString(), {
      title: 'تم قبول رحلتك ✓',
      body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
      data: { type: 'trip:accepted', tripId: trip._id.toString() },
    }).catch(() => { });

    // Compute and broadcast initial captain→pickup route asynchronously
    _emitInitialRoute(trip._id.toString(), captain, trip.startLocation).catch((err) =>
      logger.warn('[dispatch] Initial route failed (expanded):', err.message)
    );

    console.log(`🔄 [DISPATCH] ✅ Trip ${trip._id} accepted (expanded radius) by ${captainUserId}`);
    return;
  }

  // No captain found — cancel trip and notify passenger
  console.log(`🔄 [DISPATCH] ❌ No captain found for trip ${trip._id}`);

  const finalTrip = await tripRepo.findById(trip._id);
  if (finalTrip?.status === 'searching' || finalTrip?.status === 'pending_captain') {
    finalTrip.status = 'no_captain_found';
    finalTrip.cancellationReason = 'no_captain_found';
    finalTrip.cancelledBy = 'system';
    finalTrip.cancelledAt = new Date();
    await tripRepo.saveDoc(finalTrip);
  }

  emitToUser(passenger._id.toString(), 'trip:no_captain_found', {
    tripId: trip._id.toString()
  });

  logger.info(`[Trip Dispatch] ${trip._id} — no captain found`);
}


// Compute captain→pickup route and push it to the trip room.
// Called async after acceptance so it doesn't block the dispatch loop.
async function _emitInitialRoute(tripId, captain, startLocation) {
  const captainCoords = captain.location?.coordinates; // GeoJSON [lng, lat]
  if (!captainCoords || captainCoords.length < 2 || !startLocation?.lat) return;
  const cLat = captainCoords[1];
  const cLng = captainCoords[0];
  const route = await getPolyline(cLat, cLng, startLocation.lat, startLocation.lng);
  if (!route?.encodedPolyline) return;
  const trip = await tripRepo.findById(tripId);
  if (!trip || !['accepted', 'on_the_way', 'onTheWay'].includes(trip.status)) return;
  trip.polyRoute = route.encodedPolyline;
  trip.captainToPickupPolyline = route.encodedPolyline;
  trip.currentPolyline = route.encodedPolyline;
  trip.captainNotifiedAt = trip.captainNotifiedAt || new Date();
  await tripRepo.saveDoc(trip);
  emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: route.encodedPolyline });
  logger.info(`[Trip] initial route emitted for trip ${tripId}`);
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
const createTrip = async (passengerId, captainId, startLocation, endLocation, carType = 'car') => {
  // Prevent duplicate active trips for the same passenger.
  const existing = await tripRepo.findOne({ passengerId, status: { $in: ACTIVE_STATUSES } });
  if (existing) throw Object.assign(new Error('You already have an active trip'), { status: 409 });

  const captain = await captainRepo.findById(captainId);
  if (!captain || captain.status !== 'approved') throw new Error('Captain not available');
  if (!captain.isOnline) throw new Error('Captain is offline');
  if (captain.isOnTrip) throw new Error('Captain is already on a trip');

  const resolvedCarType = carType || captain.vehicleType;
  const { firstKmFare, extraKmFare } = getFareConfig(resolvedCarType);

  let polyRoute = '';
  let distanceKm = 0;
  let totalFare = 0;

  if (endLocation?.lat && endLocation?.lng) {
    try {
      const route = await getPolyline(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng);
      polyRoute = route.encodedPolyline;
      distanceKm = route.distanceKm;
      totalFare = calcFareBreakdown(distanceKm, resolvedCarType).total;
    } catch (err) {
      logger.warn('[createTrip] Route polyline failed:', err.message);
    }
  }

  const trip = await tripRepo.create({
    passengerId, captainId: captain._id, carType: resolvedCarType,
    startLocation,
    endLocation: endLocation || undefined,
    pickupLocation: {
      lat: startLocation.lat,
      lng: startLocation.lng,
      address: startLocation.address || '',
    },
    dropoffLocation: endLocation?.lat ? {
      lat: endLocation.lat,
      lng: endLocation.lng,
      address: endLocation.address || '',
    } : undefined,
    status: 'accepted',
    searchStartedAt: new Date(),
    polyRoute,
    pickupToDestinationPolyline: polyRoute,
    currentPolyline: polyRoute,
    distanceKm, totalFare, firstKmFare, extraKmFare,
    routeDistanceKm: distanceKm,
  });

  // Resolve passenger name for the notification payload
  const passenger = await userRepo.findById(passengerId);

  // Notify captain — they are identified by their User._id on the socket
  emitToUser(captain.userId.toString(), 'trip:request:incoming', {
    tripId: trip._id.toString(),
    passenger: { id: passengerId.toString(), name: passenger?.name, avatar: passenger?.avatar, phone: passenger?.phone },
    startLocation,
    endLocation: trip.endLocation,
    carType: trip.carType,
    polyRoute: trip.polyRoute,
    pickupToDestinationPolyline: trip.pickupToDestinationPolyline || trip.polyRoute,
    distanceKm: trip.distanceKm,
    totalFare: trip.totalFare,
    firstKmFare: trip.firstKmFare,
    extraKmFare: trip.extraKmFare,
  });

  notificationService.notify(captain.userId.toString(), {
    title: 'طلب رحلة جديد 🚖',
    body: `راكب بالقرب منك يطلب رحلة`,
    data: { type: 'trip:request', tripId: trip._id.toString() },
  }).catch(() => { });

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

  const now = new Date();
  trip.status = 'accepted';
  trip.acceptedAt = now;
  trip.captainAcceptedAt = now;
  trip.captainRespondedAt = now;
  await tripRepo.saveDoc(trip);

  await captainRepo.updateByUserId(captainUserId, { isOnTrip: true });

  emitToUser(trip.passengerId.toString(), 'trip:accepted', {
    tripId: trip._id.toString(),
    captain: {
      captainId: captain._id.toString(),
      name: captain.userId?.name,
      avatar: captain.userId?.avatar,
      phone: captain.userId?.phone,
      vehicleType: captain.vehicleType,
      vehicleModel: captain.vehicleModel,
      vehicleColor: captain.vehicleColor,
      plateNumber: captain.plateNumber,
      rating: captain.rating,
    },
  });

  notificationService.notify(trip.passengerId, {
    title: 'تم قبول رحلتك ✓',
    body: `الكابتن ${captain.userId?.name ?? ''} في طريقه إليك`,
    data: { type: 'trip:accepted', tripId: trip._id.toString() },
  }).catch(() => { });

  logger.info(`[Trip] ${tripId} accepted by ${captainUserId}`);
  return tripRepo.findByIdPopulated(tripId);
};

// ── Captain: status transitions (onTheWay / arrived / started) ────────
const _captainTransition = async (tripId, captainUserId, newStatus) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  const captain = await captainRepo.findByUserId(captainUserId);
  if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
  if (trip.status === newStatus) return trip; // already in target state — idempotent
  if (!trip.canTransitionTo(newStatus)) throw new Error(`Cannot transition to ${newStatus} from ${trip.status}`);

  const tsField = {
    on_the_way: 'onTheWayAt', onTheWay: 'onTheWayAt',
    arrived: 'arrivedAt',
    started: 'startedAt', in_progress: 'startedAt',
  }[newStatus];
  trip.status = newStatus;
  if (tsField) trip[tsField] = new Date();

  // New extended timestamps
  if (newStatus === 'arrived') {
    trip.captainArrivedAt = new Date();
    if (trip.pickupLocation) trip.pickupLocation.arrivedAt = new Date();
    // Switch to pickup→destination polyline immediately when captain arrives so
    // passenger sees the trip route rather than the now-irrelevant pickup route.
    if (trip.pickupToDestinationPolyline) {
      trip.currentPolyline = trip.pickupToDestinationPolyline;
    }
  }
  if (newStatus === 'started' || newStatus === 'in_progress') {
    trip.tripStartedAt = new Date();
    if (trip.captainArrivedAt) {
      trip.waitingTimeSeconds = Math.round((Date.now() - trip.captainArrivedAt.getTime()) / 1000);
    }
    // Ensure current display polyline is pickup→destination
    if (trip.pickupToDestinationPolyline) {
      trip.currentPolyline = trip.pickupToDestinationPolyline;
    }
  }

  await tripRepo.saveDoc(trip);

  emitToTrip(tripId, 'trip:status:update', { tripId, status: newStatus });

  // Push the active polyline whenever the route switches phase so both apps
  // redraw the map without needing a full trip fetch.
  if (
    (newStatus === 'arrived' || newStatus === 'started' || newStatus === 'in_progress') &&
    trip.currentPolyline
  ) {
    emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: trip.currentPolyline });
  }

  if (newStatus === 'arrived') {
    notificationService.notify(trip.passengerId, {
      title: 'الكابتن وصل 🚗',
      body: 'الكابتن في موقعك، توجه إليه',
      data: { type: 'captain:arrived', tripId },
    }).catch(() => { });
  }

  if (newStatus === 'started' || newStatus === 'in_progress') {
    notificationService.notify(trip.passengerId, {
      title: 'انطلقت رحلتك 🚀',
      body: 'الكابتن بدأ الرحلة — استمتع بالرحلة',
      data: { type: 'trip:started', tripId },
    }).catch(() => { });
  }

  logger.info(`[Trip] ${tripId} → ${newStatus}`);
  return trip;
};

const markOnTheWay = async (tripId, captainUserId, captainLat, captainLng) => {
  const trip = await _captainTransition(tripId, captainUserId, 'on_the_way');
  trip.captainOnTheWayAt = trip.captainOnTheWayAt || new Date();

  if (captainLat && captainLng && trip.startLocation?.lat) {
    try {
      const route = await getPolyline(
        captainLat, captainLng,
        trip.startLocation.lat, trip.startLocation.lng
      );
      if (route?.encodedPolyline) {
        trip.polyRoute = route.encodedPolyline;
        trip.captainToPickupPolyline = route.encodedPolyline;
        trip.currentPolyline = route.encodedPolyline;
        await tripRepo.saveDoc(trip);
        emitToTrip(tripId, 'trip:route:update', {
          tripId: tripId.toString(),
          polyRoute: route.encodedPolyline,
        });
        return trip;
      }
    } catch (err) {
      logger.warn('[markOnTheWay] polyRoute calc failed:', err.message);
    }
  }

  await tripRepo.saveDoc(trip);
  return trip;
};
const markArrived = (tripId, captainUserId) => _captainTransition(tripId, captainUserId, 'arrived');
const startTrip   = async (tripId, captainUserId) => {
  const trip = await _captainTransition(tripId, captainUserId, 'in_progress');
  // If no pickup→destination polyline yet, compute it now
  if (!trip.pickupToDestinationPolyline && trip.endLocation?.lat) {
    try {
      const route = await getPolyline(
        trip.startLocation.lat, trip.startLocation.lng,
        trip.endLocation.lat, trip.endLocation.lng
      );
      if (route?.encodedPolyline) {
        trip.pickupToDestinationPolyline = route.encodedPolyline;
        trip.currentPolyline = route.encodedPolyline;
        trip.polyRoute = route.encodedPolyline;
        if (!trip.routeDistanceKm) trip.routeDistanceKm = route.distanceKm;
        await tripRepo.saveDoc(trip);
        emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: route.encodedPolyline });
      }
    } catch (err) {
      logger.warn('[startTrip] pickup→destination polyline failed:', err.message);
    }
  }
  return trip;
};

// ── Captain: end trip ─────────────────────────────────────────────────
const endTrip = async (tripId, captainUserId, clientDistanceKm) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  const captain = await captainRepo.findByUserId(captainUserId);
  if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
  if (!trip.canTransitionTo('completed') && !trip.canTransitionTo('ended'))
    throw new Error(`Cannot end from status: ${trip.status}`);

  const now = new Date();
  const gpsDistanceKm = clientDistanceKm || 0;
  const finalDistance = trip.routeDistanceKm > 0
    ? trip.routeDistanceKm
    : (trip.distanceKm > 0 ? trip.distanceKm : gpsDistanceKm);

  const fare = calcFareBreakdown(finalDistance, trip.carType);

  trip.status = 'completed';
  trip.endedAt = now;
  trip.tripEndedAt = now;
  trip.distanceKm = finalDistance;
  trip.totalFare = fare.total;
  trip.gpsDistanceKm = gpsDistanceKm;
  if (trip.dropoffLocation) trip.dropoffLocation.arrivedAt = now;

  if (trip.tripStartedAt) {
    trip.travelTimeSeconds = Math.round((now.getTime() - trip.tripStartedAt.getTime()) / 1000);
  }

  await tripRepo.saveDoc(trip);

  await captainRepo.updateByUserId(captainUserId, { isOnTrip: false, $inc: { totalTrips: 1 } });

  emitToTrip(tripId, 'trip:status:update', { tripId, status: 'completed', fare });

  notificationService.notify(trip.passengerId, {
    title: 'وصلت! 🎉',
    body: `المبلغ الإجمالي: ${fare.total} ريال`,
    data: { type: 'trip:ended', tripId, fare: String(fare.total) },
  }).catch(() => { });

  notificationService.notify(captainUserId, {
    title: 'انتهت الرحلة ✓',
    body: `المبلغ: ${fare.total} ريال — ${finalDistance.toFixed(1)} كم`,
    data: { type: 'trip:ended', tripId, fare: String(fare.total) },
  }).catch(() => { });

  logger.info(`[Trip] ${tripId} completed | km=${finalDistance} | fare=${fare.total}`);
  return trip;
};

// ── Either party: cancel active trip (no tripId needed) ──────────────
// Used by POST /trips/cancel — resolves the caller's current active trip
// then delegates to the normal cancelTrip flow.
// أضف هذه الوظيفة أو عدّل الموجودة
// داخل src/modules/trip/trip.service.js

const cancelCurrentTrip = async (userId, role, reason) => {
  let trip;
  if (role === 'passenger') {
    trip = await tripRepo.findOne({ passengerId: userId, status: { $in: ACTIVE_STATUSES } });
  } else if (role === 'captain') {
    const captain = await captainRepo.findByUserId(userId);
    if (!captain) throw Object.assign(new Error('Captain profile not found'), { status: 404 });
    trip = await tripRepo.findOne({ captainId: captain._id, status: { $in: ACTIVE_STATUSES } });
  }
  // ✅ عدّل هذا الجزء - لا ترمي خطأ، بل ارجع نجاحاً
  if (!trip) {
    return { message: 'No active trip found, assuming already cancelled', alreadyCancelled: true };
  }
  return cancelTrip(trip._id.toString(), userId, role, reason);
};

// ── Either party: cancel ──────────────────────────────────────────────
const cancelTrip = async (tripId, userId, role, reason) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  const cancelledStatuses = ['cancelled', 'cancelled_by_passenger', 'cancelled_by_captain', 'cancelled_by_system'];
  if (cancelledStatuses.includes(trip.status)) {
    return { message: 'Trip already cancelled', alreadyCancelled: true };
  }

  const newStatus = role === 'passenger' ? 'cancelled_by_passenger'
    : role === 'captain' ? 'cancelled_by_captain'
    : 'cancelled_by_system';

  if (!trip.canTransitionTo(newStatus) && !trip.canTransitionTo('cancelled'))
    throw new Error('Cannot cancel trip in current state');

  if (role === 'passenger') {
    if (trip.passengerId.toString() !== userId.toString()) throw new Error('Unauthorized');
  } else if (role === 'captain') {
    const captain = await captainRepo.findByUserId(userId);
    if (!captain || trip.captainId.toString() !== captain._id.toString()) throw new Error('Unauthorized');
  }

  trip.status = newStatus;
  trip.cancelledAt = new Date();
  trip.cancellationReason = reason || null;
  trip.cancelledBy = role;
  await tripRepo.saveDoc(trip);

  // Free the captain regardless of who cancelled — passenger cancel was leaving isOnTrip: true.
  if (trip.captainId) {
    captainRepo.updateById(trip.captainId, { isOnTrip: false }).catch(() => {});
  }

  emitToTrip(tripId, 'trip:cancelled', { tripId, status: newStatus, reason: reason || null, cancelledBy: role });

  // Notify the OTHER party
  const otherPartyId = role === 'passenger'
    ? trip.captainId && (await captainRepo.findById(trip.captainId))?.userId
    : trip.passengerId;
  if (otherPartyId) {
    notificationService.notify(otherPartyId, {
      title: 'تم إلغاء الرحلة',
      body: role === 'passenger' ? 'قام الراكب بإلغاء الرحلة' : 'قام الكابتن بإلغاء الرحلة',
      data: { type: 'trip:cancelled', tripId },
    }).catch(() => { });
  }

  logger.info(`[Trip] ${tripId} cancelled by ${role}`);
  return trip;
};

// ── Rating ────────────────────────────────────────────────────────────

const rateCaptain = async (tripId, passengerId, { rating, tags = [] }) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw Object.assign(new Error('Trip not found'), { status: 404 });
  if (trip.passengerId.toString() !== passengerId.toString())
    throw Object.assign(new Error('Unauthorized'), { status: 403 });
  if (!['ended', 'completed'].includes(trip.status))
    throw Object.assign(new Error('Trip not ended'), { status: 400 });
  if (trip.passengerRating)
    throw Object.assign(new Error('Already rated'), { status: 409 });

  trip.passengerRating = rating;
  trip.passengerRatingTags = tags;
  await tripRepo.saveDoc(trip);

  // Update captain's rolling average rating
  const captain = await captainRepo.findById(trip.captainId);
  if (captain) {
    const newCount = captain.totalTrips || 1;
    const oldRating = captain.rating || 0;
    const newRating = ((oldRating * (newCount - 1)) + rating) / newCount;
    await captainRepo.updateById(trip.captainId, { rating: Math.min(5, newRating) });
  }

  logger.info(`[Rating] trip=${tripId} captain rated ${rating} by passenger`);
  return trip;
};

const ratePassenger = async (tripId, captainUserId, { rating, tags = [] }) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip) throw Object.assign(new Error('Trip not found'), { status: 404 });

  const captain = await captainRepo.findByUserId(captainUserId);
  if (!captain || trip.captainId.toString() !== captain._id.toString())
    throw Object.assign(new Error('Unauthorized'), { status: 403 });
  if (!['ended', 'completed'].includes(trip.status))
    throw Object.assign(new Error('Trip not ended'), { status: 400 });
  if (trip.captainRating)
    throw Object.assign(new Error('Already rated'), { status: 409 });

  trip.captainRating = rating;
  trip.captainRatingTags = tags;
  await tripRepo.saveDoc(trip);

  logger.info(`[Rating] trip=${tripId} passenger rated ${rating} by captain`);
  return trip;
};

// ── Captain moving: recalculate captain→pickup route ─────────────────
// Called from captain.socket every ~300 m of movement so both sides see an updated polyline.
const refreshRoute = async (tripId, captainLat, captainLng) => {
  const trip = await tripRepo.findById(tripId);
  if (!trip || !['accepted', 'on_the_way', 'onTheWay'].includes(trip.status)) return;
  if (!trip.startLocation?.lat) return;
  const route = await getPolyline(captainLat, captainLng, trip.startLocation.lat, trip.startLocation.lng);
  if (!route?.encodedPolyline) return;
  trip.polyRoute = route.encodedPolyline;
  trip.captainToPickupPolyline = route.encodedPolyline;
  trip.currentPolyline = route.encodedPolyline;
  await tripRepo.saveDoc(trip);
  emitToTrip(tripId, 'trip:route:update', { tripId, polyRoute: route.encodedPolyline });
};

// ── Persist captainLastLocation snapshot to trip doc ─────────────────
// Called from captain.socket on every throttled location update.
const updateCaptainLocation = async (tripId, lat, lng, heading = 0) => {
  await tripRepo.findByIdAndUpdate(tripId, {
    $set: {
      'captainLastLocation.lat': lat,
      'captainLastLocation.lng': lng,
      'captainLastLocation.heading': heading,
      'captainLastLocation.updatedAt': new Date(),
    },
  });
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
const estimateFare = async (startLat, startLng, endLat, endLng, carType = 'car') => {
  try {
    const route = await getPolyline(startLat, startLng, endLat, endLng);
    const distanceKm = route.distanceKm;
    const fare = calcFareBreakdown(distanceKm, carType);
    return {
      distanceKm: Math.round(distanceKm * 100) / 100,
      durationMins: route.durationMins,
      durationInTrafficMins: route.durationInTrafficMins,
      encodedPolyline: route.encodedPolyline,
      ...fare,
    };
  } catch (err) {
    logger.warn('[estimateFare] Route failed, falling back to haversine:', err.message);
    const distanceKm = haversineDistance(startLat, startLng, endLat, endLng);
    return {
      distanceKm: Math.round(distanceKm * 100) / 100,
      durationMins: 0,
      durationInTrafficMins: 0,
      encodedPolyline: '',
      ...calcFareBreakdown(distanceKm, carType),
    };
  }
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
  cancelCurrentTrip,
  rateCaptain,
  ratePassenger,
  getCurrentTrip,
  getTrip,
  refreshRoute,
  updateCaptainLocation,
};
