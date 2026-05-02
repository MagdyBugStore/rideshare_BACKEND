const { Server } = require('socket.io');
const env = require('../config/env');
const { verifyAccessToken } = require('../utils/jwt.util');
const logger = require('../config/logger');

let io;

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

    // Personal room — enables targeted messages to any user
    socket.join(`user:${userId}`);

    // Role rooms
    if (role === 'passenger') socket.join('passengers');

    // Register per-module handlers (lazy require avoids circular deps at load time)
    require('../modules/captain/captain.socket').register(io, socket);
    require('../modules/trip/trip.socket').register(io, socket);

    socket.on('disconnect', (reason) => {
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

module.exports = { initSocket, getIo, emitToUser, emitToTrip, emitToPassengers };
