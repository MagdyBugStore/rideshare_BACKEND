// Trip socket handler — manages room membership for realtime trip updates.
// Business logic (state transitions) stays in trip.service; this file only
// handles the socket plumbing.
const tripService = require('./trip.service');
const logger = require('../../config/logger');

const register = (io, socket) => {
  const userId = socket.data.userId;

  // Client joins trip room to receive realtime status updates + location
  socket.on('trip:join', (tripId) => {
    if (!tripId) return;
    socket.join(`trip:${tripId}`);
    socket.data.activeTripId = tripId;
  });

  socket.on('trip:leave', (tripId) => {
    if (!tripId) return;
    socket.leave(`trip:${tripId}`);
    if (socket.data.activeTripId === tripId) {
      socket.data.activeTripId = null;
    }
  });

  // Captain: respond to incoming trip request (from dispatch loop)
  socket.on('trip:request:accept', () => {
    const resolved = tripService.captainAccepted(userId);
    if (!resolved) {
      socket.emit('error', { code: 'TRIP_EXPIRED', message: 'الرحلة لم تعد متاحة' });
    }
    logger.info(`[Trip Socket] ${userId} accepted dispatch`);
  });

  socket.on('trip:request:reject', () => {
    tripService.captainRejected(userId);
    logger.info(`[Trip Socket] ${userId} rejected dispatch`);
  });
};

module.exports = { register };
