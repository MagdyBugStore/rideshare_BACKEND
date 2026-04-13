// src/socket/index.js
const { Server } = require('socket.io');
const env = require('../config/env');
const tripService = require('../modules/trip/trip.service');
const Captain = require('../modules/captain/captain.model');

let io;
const userSockets = new Map(); // userId -> socketId
const socketToUser = new Map(); // socketId -> userId

/**
 * Initialize Socket.IO server
 * @param {http.Server} server - HTTP server instance
 * @returns {Server} Socket.IO instance
 */
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.SOCKET_CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    // Register user (called from client after authentication)
    socket.on('register', (userId) => {
      if (!userId) return;
      // Remove old socket if exists
      const oldSocketId = userSockets.get(userId);
      if (oldSocketId) {
        socketToUser.delete(oldSocketId);
      }
      userSockets.set(userId, socket.id);
      socketToUser.set(socket.id, userId);
      console.log(`✅ User ${userId} registered with socket ${socket.id}`);
    });

    // Join a trip room (for real-time updates during a trip)
    socket.on('join-trip', (tripId) => {
      if (!tripId) return;
      socket.join(`trip-${tripId}`);
      console.log(`🚗 Socket ${socket.id} joined room trip-${tripId}`);
    });

    // Leave trip room
    socket.on('leave-trip', (tripId) => {
      if (!tripId) return;
      socket.leave(`trip-${tripId}`);
    });

    // Captain updates location
    socket.on('captain:location', async (data) => {
      const { captainId, lat, lng } = data;
      if (!captainId || lat == null || lng == null) return;

      try {
        // Update captain's location in DB
        await Captain.updateOne(
          { userId: captainId, isOnline: true },
          {
            $set: {
              location: { type: 'Point', coordinates: [lng, lat] },
              lastLocationAt: new Date(),
            },
          }
        );
        // Optionally broadcast to nearby passengers (can be implemented later)
        // For now, we just store the location; passengers will fetch via REST API.
      } catch (err) {
        console.error('Error updating captain location:', err);
      }
    });

    // Trip: start confirmation (both passenger & captain)
    socket.on('trip:start', async (data) => {
      const { tripId, userId, role } = data;
      if (!tripId || !userId || !role) return;

      try {
        const trip = await tripService.confirmStart(tripId, userId, role);
        // Notify both parties that trip has started (if both confirmed)
        if (trip.status === 'active') {
          io.to(`trip-${tripId}`).emit('trip:started', trip);
        } else {
          // Just acknowledge that this side confirmed
          socket.emit('trip:confirmed-start', { tripId, role });
        }
      } catch (err) {
        socket.emit('error', { message: err.message });
      }
    });

    // Trip: request end (passenger or captain)
    socket.on('trip:end-request', async (data) => {
      const { tripId, userId, role } = data;
      if (!tripId || !userId || !role) return;

      try {
        const trip = await tripService.requestEndTrip(tripId, userId, role);
        io.to(`trip-${tripId}`).emit('trip:end-requested', { requestedBy: role });
      } catch (err) {
        socket.emit('error', { message: err.message });
      }
    });

    // Trip: confirm end (passenger or captain)
    socket.on('trip:end-confirm', async (data) => {
      const { tripId, userId, role, distanceKm } = data;
      if (!tripId || !userId || !role || distanceKm == null) return;

      try {
        const trip = await tripService.confirmEndTrip(tripId, userId, role, distanceKm);
        if (trip.status === 'ended') {
          io.to(`trip-${tripId}`).emit('trip:ended', trip);
        } else {
          socket.emit('trip:confirmed-end', { tripId, role });
        }
      } catch (err) {
        socket.emit('error', { message: err.message });
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      const userId = socketToUser.get(socket.id);
      if (userId) {
        userSockets.delete(userId);
        socketToUser.delete(socket.id);
        console.log(`❌ User ${userId} disconnected (socket ${socket.id})`);
      } else {
        console.log(`❌ Socket ${socket.id} disconnected`);
      }
    });
  });

  return io;
};

/**
 * Get Socket.IO instance (must be called after initSocket)
 * @returns {Server}
 */
const getIo = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};

/**
 * Emit event to a specific user
 * @param {string} userId - User ID
 * @param {string} event - Event name
 * @param {any} data - Event data
 */
const emitToUser = (userId, event, data) => {
  const socketId = userSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit(event, data);
  }
};

/**
 * Emit event to a trip room
 * @param {string} tripId - Trip ID
 * @param {string} event - Event name
 * @param {any} data - Event data
 */
const emitToTrip = (tripId, event, data) => {
  io.to(`trip-${tripId}`).emit(event, data);
};

module.exports = { initSocket, getIo, emitToUser, emitToTrip };