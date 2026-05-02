const captainRepo = require('./captain.repository');
const logger = require('../../config/logger');
const { emitToPassengers } = require('../../socket');

const LOCATION_THROTTLE_MS = 3000;
const _lastDbWrite = new Map();

const register = (io, socket) => {
  if (socket.data.role !== 'captain') return;

  const userId = socket.data.userId;

  // ── Go online ────────────────────────────────────────────────────
  socket.on('captain:go:online', async () => {
    try {
      const captain = await captainRepo.findByUserIdPopulated(userId);
      if (!captain || captain.status !== 'approved') {
        return socket.emit('error', { code: 'NOT_APPROVED', message: 'Captain not approved' });
      }

      // Profile completeness gate
      if (!captain.vehicleType || !captain.vehicleModel || !captain.plateNumber) {
        return socket.emit('error', { code: 'PROFILE_INCOMPLETE', message: 'Complete your vehicle profile first' });
      }

      captain.isOnline = true;
      captain.socketId = socket.id;
      captain.lastActiveAt = new Date();
      await captainRepo.saveDoc(captain);

      // Cache Captain._id on socket for fast access in location updates
      socket.data.captainId = captain._id.toString();

      emitToPassengers('captain:appear', _formatAppear(captain));
      socket.emit('captain:online:ack', { isOnline: true });

      logger.info(`[Captain Socket] ${userId} went online`);
    } catch (err) {
      logger.error('[Captain Socket] captain:go:online error', err);
    }
  });

  // ── Go offline ───────────────────────────────────────────────────
  socket.on('captain:go:offline', () => _setOffline(userId, socket));

  // ── Location update (high frequency) ────────────────────────────
  socket.on('captain:location:update', async ({ lat, lng, heading = 0 }) => {
    if (lat == null || lng == null) return;

    const captainId = socket.data.captainId;
    if (!captainId) return; // not online yet

    // Instant broadcast to passengers (no DB wait)
    emitToPassengers('captain:move', { captainId, lat, lng, heading });

    // If captain is in a live trip, also broadcast to the trip room
    const tripId = socket.data.activeTripId;
    if (tripId) {
      io.to(`trip:${tripId}`).emit('trip:location:update', { captainId, lat, lng, heading });
    }

    // Throttled DB write
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

  // ── Auto-offline on disconnect ───────────────────────────────────
  socket.on('disconnect', () => _setOffline(userId, socket));
};

// ── Private ──────────────────────────────────────────────────────────
async function _setOffline(userId, socket) {
  try {
    const captain = await captainRepo.findByUserId(userId);
    if (!captain || !captain.isOnline) return;

    // Guard against duplicate-socket race: a newer socket may have taken over
    if (captain.socketId && captain.socketId !== socket.id) return;

    captain.isOnline = false;
    captain.socketId = null;
    captain.lastActiveAt = new Date();
    await captainRepo.saveDoc(captain);

    // Use socket.to instead of emitToPassengers so the emitter excludes itself
    socket.to('passengers').emit('captain:disappear', { captainId: captain._id.toString() });
    logger.info(`[Captain Socket] ${userId} went offline`);
  } catch (err) {
    logger.error('[Captain Socket] _setOffline error', err);
  }
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
