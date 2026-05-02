const { Server } = require('socket.io');
const env = require('../config/env');
const { verifyAccessToken } = require('../utils/jwt.util');
const logger = require('../config/logger');

let io;

// In-memory presence map: userId → Set<socketId>
// Replace with Redis adapter for horizontal scaling
const _presence = new Map();

const _addPresence = (userId, socketId) => {
  if (!_presence.has(userId)) _presence.set(userId, new Set());
  _presence.get(userId).add(socketId);
};

const _removePresence = (userId, socketId) => {
  const sockets = _presence.get(userId);
  if (!sockets) return;
  sockets.delete(socketId);
  if (sockets.size === 0) _presence.delete(userId);
};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.SOCKET_CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // JWT auth middleware — runs before every connection
  io.use((socket, next) => {
    const authHeader = socket.handshake.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next(new Error('UNAUTHORIZED'));
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return next(new Error('INVALID_TOKEN'));
    }
    socket.data.userId = decoded.id.toString();
    socket.data.role = decoded.role;
    next();
  });

  io.on('connection', (socket) => {
    const { userId, role } = socket.data;
    logger.info(`[Socket] connected ${socket.id} | user=${userId} | role=${role}`);

    // Track presence
    _addPresence(userId, socket.id);

    // Personal room — enables targeted messages to any user
    socket.join(`user:${userId}`);

    // Role rooms
    if (role === 'passenger') socket.join('passengers');

    // Register per-module handlers (lazy require avoids circular deps at load time)
    require('../modules/captain/captain.socket').register(io, socket);
    require('../modules/trip/trip.socket').register(io, socket);

    socket.on('disconnect', (reason) => {
      _removePresence(userId, socket.id);
      logger.info(`[Socket] disconnected ${socket.id} | user=${userId} | reason=${reason}`);
    });
  });

  return io;
};

const getIo = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};

// Emit to a specific user's personal room
const emitToUser = (userId, event, data) => {
  if (!io) return;
  io.to(`user:${userId}`).emit(event, data);
};

// Emit to all sockets inside a trip room
const emitToTrip = (tripId, event, data) => {
  if (!io) return;
  io.to(`trip:${tripId}`).emit(event, data);
};

// Emit to all online passengers
const emitToPassengers = (event, data) => {
  if (!io) return;
  io.to('passengers').emit(event, data);
};

// Check if a user has at least one active socket connection
const isUserOnline = (userId) => _presence.has(userId.toString());

// Get all currently online userIds
const getOnlineUserIds = () => Array.from(_presence.keys());

module.exports = { initSocket, getIo, emitToUser, emitToTrip, emitToPassengers, isUserOnline, getOnlineUserIds };
