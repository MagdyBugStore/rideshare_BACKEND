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

  // In-trip chat relay — broadcast to all members of the trip room
  socket.on('chat:message', ({ tripId, text }) => {
    if (!tripId || !text?.trim()) return;
    const payload = {
      senderId: userId,
      role: socket.data.role,
      text: text.trim(),
      sentAt: new Date().toISOString(),
    };
    io.to(`trip:${tripId}`).emit('chat:message', payload);
    logger.info(`[Chat] trip=${tripId} from=${userId} text="${text.trim().slice(0, 40)}"`);
  });
};

module.exports = { register };
