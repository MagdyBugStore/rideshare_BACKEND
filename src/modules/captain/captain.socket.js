// src/modules/captain/captain.socket.js

const captainRepo = require('./captain.repository');
const logger = require('../../config/logger');
const { emitToPassengers } = require('../../socket');
const { haversineDistance } = require('../../utils/distance.util');
const tripService = require('../trip/trip.service');

const LOCATION_THROTTLE_MS = 3000;
const DISCONNECT_GRACE_MS = 10000;
const ROUTE_REFRESH_THRESHOLD_KM = 0.3;
const TRIP_LOCATION_THROTTLE_MS = 3000; // throttle trip captainLastLocation DB writes
const _lastDbWrite = new Map();
const _lastTripWrite = new Map();
const _disconnectTimers = new Map();
const _lastRouteCalc = new Map(); // userId → { lat, lng }

const register = (io, socket) => {
  if (socket.data.role !== 'captain') return;

  const userId = socket.data.userId;
  let captainId = null;
  let captainLocation = null;

  socket.on('captain:go:online', async () => {
    try {
      const captain = await captainRepo.findByUserIdPopulated(userId);
      if (!captain || captain.status !== 'approved') {
        return socket.emit('error', { code: 'NOT_APPROVED', message: 'Captain not approved' });
      }

      captain.isOnline = true;
      captain.socketId = socket.id;
      captain.lastActiveAt = new Date();
      await captainRepo.saveDoc(captain);

      captainId = captain._id.toString();
      socket.data.captainId = captainId;
      captainLocation = captain.location?.coordinates
        ? { lat: captain.location.coordinates[1], lng: captain.location.coordinates[0] }
        : null;

      _emitToNearbyPassengers(io, captainLocation, 'captain:appear', _formatAppear(captain));

      socket.emit('captain:online:ack', { isOnline: true });
      logger.info(`[Captain Socket] ${userId} went online`);
    } catch (err) {
      logger.error('[Captain Socket] captain:go:online error', err);
    }
  });

  socket.on('captain:location:update', async ({ lat, lng, heading = 0 }) => {
    if (lat == null || lng == null) return;

    const cId = socket.data.captainId || captainId;
    if (!cId) return;

    captainLocation = { lat, lng };

    // Forward location to the active trip room so the passenger's map updates in real-time.
    const activeTripId = socket.data.activeTripId;
    if (activeTripId) {
      io.to(`trip:${activeTripId}`).emit('trip:location:update', { lat, lng, heading });

      // Refresh the captain→pickup polyline every ~300 m so both screens show an updated route.
      const lastCalc = _lastRouteCalc.get(userId);
      const movedKm = lastCalc ? haversineDistance(lat, lng, lastCalc.lat, lastCalc.lng) : Infinity;
      if (movedKm >= ROUTE_REFRESH_THRESHOLD_KM) {
        _lastRouteCalc.set(userId, { lat, lng });
        tripService.refreshRoute(activeTripId, lat, lng).catch((err) =>
          logger.warn('[Captain Socket] route refresh failed:', err.message)
        );
      }

      // Persist captainLastLocation to the trip document (throttled)
      const tripNow = Date.now();
      if (tripNow - (_lastTripWrite.get(activeTripId) ?? 0) >= TRIP_LOCATION_THROTTLE_MS) {
        _lastTripWrite.set(activeTripId, tripNow);
        tripService.updateCaptainLocation(activeTripId, lat, lng, heading).catch((err) =>
          logger.warn('[Captain Socket] captainLastLocation update failed:', err.message)
        );
      }
    }

    // ✅ بث تحديث الموقع فقط للركاب القريبين
    _emitToNearbyPassengers(io, captainLocation, 'captain:move', {
      captainId: cId,
      lat,
      lng,
      heading
    });

    // تحديث قاعدة البيانات (مثل السابق)
    const now = Date.now();
    if (now - (_lastDbWrite.get(userId) ?? 0) < LOCATION_THROTTLE_MS) return;
    _lastDbWrite.set(userId, now);

    captainRepo
      .updateByUserId(userId, {
        $set: {
          location: { type: 'Point', coordinates: [lng, lat] },
          heading,
          lastLocationAt: new Date(),
        },
      })
      .catch((err) => logger.error('[Captain Socket] location DB write error', err));
  });

  // ── Explicit offline (captain taps "go offline" in the app) ────────────
  socket.on('captain:go:offline', async () => {
    logger.info(`[Captain Socket] captain:go:offline received for ${userId}`);
    if (_disconnectTimers.has(userId)) {
      clearTimeout(_disconnectTimers.get(userId));
      _disconnectTimers.delete(userId);
    }
    await _setOffline(io, userId, socket.data.captainId || captainId, socket);
  });

  // ── Auto-offline on disconnect ──────────────────────────────────────────
  socket.on('disconnect', () => {
    logger.info(`[Captain Socket] disconnect event fired for ${userId}`);
    _lastRouteCalc.delete(userId);

    const timer = setTimeout(() => {
      _disconnectTimers.delete(userId);
      // ✅ تمرير captainId المخزن
      _setOffline(io, userId, socket.data.captainId || captainId, socket);
    }, DISCONNECT_GRACE_MS);
    _disconnectTimers.set(userId, timer);
  });

  if (_disconnectTimers.has(userId)) {
    clearTimeout(_disconnectTimers.get(userId));
    _disconnectTimers.delete(userId);
    logger.info(`[Captain Socket] ${userId} reconnected — cancelled offline timer`);
  }
};



// ── Private ──────────────────────────────────────────────────────────
async function _setOffline(io, userId, captainId, socket) {
  try {
    logger.info(`[Captain Socket] _setOffline called for userId=${userId}, captainId=${captainId}`);

    // ✅ إذا لم يكن لدينا captainId نحاول جلبه من قاعدة البيانات
    let finalCaptainId = captainId;
    let captain = await captainRepo.findByUserId(userId);

    if (!captain) {
      logger.warn(`[Captain Socket] No captain found for userId=${userId}`);
      return;
    }

    if (!finalCaptainId) {
      finalCaptainId = captain._id.toString();
    }

    if (!captain.isOnline) {
      logger.info(`[Captain Socket] Captain ${userId} already offline`);
      return;
    }

    if (captain.socketId && captain.socketId !== socket.id) {
      logger.info(`[Captain Socket] Socket mismatch for ${userId}: stored=${captain.socketId}, current=${socket.id}`);
      return;
    }

    captain.isOnline = false;
    captain.socketId = null;
    captain.lastActiveAt = new Date();
    await captain.save();

    // ✅ استخدام io بدلاً من socket لإرسال الحدث
    logger.info(`[Captain Socket] Emitting captain:disappear for captainId=${finalCaptainId}`);
    io.to('passengers').emit('captain:disappear', { captainId: finalCaptainId });

    logger.info(`[Captain Socket] ${userId} went offline`);
  } catch (err) {
    logger.error('[Captain Socket] _setOffline error', err);
  }
}


function _emitToNearbyPassengers(io, _, event, data) {
  console.log(`📡 [BROADCAST] Event: ${event} | name:`, data.name);
  if (!io) return;
  io.to('passengers').emit(event, data);
}

function _formatAppear(captain) {
  return {
    captainId: captain._id.toString(),
    name: captain.userId?.name,
    avatar: captain.userId?.avatar,
    vehicleType: captain.vehicleType,
    vehicleColor: captain.vehicleColor,
    lat: captain.location?.coordinates?.[1] ?? 0,
    lng: captain.location?.coordinates?.[0] ?? 0,
    heading: captain.heading ?? 0,
    rating: captain.rating ?? 0,
  };
}

module.exports = { register };