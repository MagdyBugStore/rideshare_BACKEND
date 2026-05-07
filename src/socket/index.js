// src/socket/index.js

const { Server } = require('socket.io');
const env = require('../config/env');
const { verifyAccessToken } = require('../utils/jwt.util');
const logger = require('../config/logger');
const { simpleSocketLogger } = require('../middlewares/socketLogger.middleware');
const captainRepo = require('../modules/captain/captain.repository');

let io;

// In-memory presence map: userId → Set<socketId>
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

// تسجيل جميع الأحداث على مستوى الـ socket
const wrapSocketWithLogging = (socket) => {
  const userId = socket.data.userId;
  const socketId = socket.id;

  simpleSocketLogger.logConnection(socketId, userId);

  const originalEmit = socket.emit;
  socket.emit = function (event, ...args) {
    simpleSocketLogger.logOutgoing(socketId, userId, event, args[0]);
    return originalEmit.apply(this, [event, ...args]);
  };

  const originalOn = socket.on;
  socket.on = function (event, listener) {
    const wrappedListener = (...args) => {
      simpleSocketLogger.logIncoming(socketId, userId, event, args[0]);
      return listener.apply(this, args);
    };
    return originalOn.call(this, event, wrappedListener);
  };

  const originalDisconnect = socket.disconnect;
  socket.disconnect = function (...args) {
    simpleSocketLogger.logDisconnection(socketId, userId, 'manual disconnect');
    return originalDisconnect.apply(this, args);
  };

  return socket;
};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.SOCKET_CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // JWT auth middleware
  io.use((socket, next) => {
    const authHeader = socket.handshake.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      logger.warn(`[Socket] Socket ${socket.id} - No token provided`);
      return next(new Error('UNAUTHORIZED'));
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      logger.warn(`[Socket] Socket ${socket.id} - Invalid token`);
      return next(new Error('INVALID_TOKEN'));
    }
    socket.data.userId = decoded.id.toString();
    socket.data.role = decoded.role;

    logger.info(`[Socket Auth] Socket ${socket.id} authenticated as user ${decoded.id} (${decoded.role})`);
    next();
  });

  io.on('connection', (rawSocket) => {
    const socket = wrapSocketWithLogging(rawSocket);

    const { userId, role } = socket.data;
    console.log(`✅ [Socket CONNECTED] ${socket.id} | user=${userId} | role=${role}`);

    _addPresence(userId, socket.id);

    socket.join(`user:${userId}`);

    if (role === 'passenger') {
      socket.join('passengers');
      console.log(`👤 [PASSENGER JOINED] socket:${socket.id} | user:${userId}`);
      console.log(`📊 [PASSENGER COUNT] Now ${io.sockets.adapter.rooms.get('passengers')?.size || 0} passengers online`);
    }

    console.log(`📌 [Socket ROOMS] ${socket.id} joined rooms: user:${userId}${role === 'passenger' ? ', passengers' : ''}`);

    require('../modules/captain/captain.socket').register(io, socket);
    require('../modules/trip/trip.socket').register(io, socket);

    socket.on('disconnect', (reason) => {
      _removePresence(userId, socket.id);
      simpleSocketLogger.logDisconnection(socket.id, userId, reason);
      console.log(`❌ [Socket DISCONNECTED] ${socket.id} | user=${userId} | reason=${reason}`);
    });

    socket.on('error', (err) => {
      console.error(`⚠️ [Socket ERROR] ${socket.id} | user=${userId} | error:`, err.message);
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ✅ HEARTBEAT - التحقق من السائقين غير النشطين
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  // setInterval(() => {
  //   const now = Date.now();
    
  //   for (const [userId, socketIds] of _presence.entries()) {
  //     captainRepo.findByUserId(userId)
  //       .then(captain => {
  //         if (captain && captain.isOnline && captain.lastActiveAt) {
  //           const inactiveMs = now - new Date(captain.lastActiveAt).getTime();
  //           if (inactiveMs > 120000) { // 2 دقيقة بدون نشاط
  //             logger.info(`[Heartbeat] Marking captain ${userId} as offline (inactive for ${inactiveMs}ms)`);
              
  //             if (io) {
  //               io.to('passengers').emit('captain:disappear', { 
  //                 captainId: captain._id.toString() 
  //               });
  //             }
              
  //             captain.isOnline = false;
  //             captain.socketId = null;
  //             captain.save()
  //               .then(() => logger.info(`[Heartbeat] Captain ${userId} marked offline`))
  //               .catch(err => logger.error('[Heartbeat] Failed to save captain status', err));
  //           }
  //         }
  //       })
  //       .catch(err => logger.error('[Heartbeat] Error checking captain', err));
  //   }
  // }, 60000); // كل دقيقة

  // مراقبة أحداث الـ io العامة
  io.of('/').adapter.on('create-room', (room) => {
    // console.log(`🏠 [Socket ROOM CREATE] room: ${room}`);
  });

  io.of('/').adapter.on('join-room', (room, id) => {
    // console.log(`🚪 [Socket ROOM JOIN] socket: ${id} joined room: ${room}`);
  });

  io.of('/').adapter.on('leave-room', (room, id) => {
    // console.log(`🚪 [Socket ROOM LEAVE] socket: ${id} left room: ${room}`);
  });

  return io;
};

const getIo = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};

const emitToUser = (userId, event, data) => {
  if (!io) return;
  console.log(`📤 [EMIT TO USER] user:${userId} | event:${event}`);
  io.to(`user:${userId}`).emit(event, data);
};

const emitToTrip = (tripId, event, data) => {
  if (!io) return;
  console.log(`📤 [EMIT TO TRIP] trip:${tripId} | event:${event}`);
  io.to(`trip:${tripId}`).emit(event, data);
};

const emitToPassengers = (event, data) => {
  if (!io) return;
  console.log(`📤 [EMIT TO PASSENGERS] event:${event}`);
  io.to('passengers').emit(event, data);
};

const isUserOnline = (userId) => _presence.has(userId.toString());

const getOnlineUserIds = () => Array.from(_presence.keys());

module.exports = {
  initSocket,
  getIo,
  emitToUser,
  emitToTrip,
  emitToPassengers,
  isUserOnline,
  getOnlineUserIds
};