const { Server } = require('socket.io');
const env = require('../config/env');
const { verifyAccessToken } = require('../utils/jwt.util');
const logger = require('../config/logger');
const { simpleSocketLogger } = require('../middlewares/socketLogger.middleware');

let io;

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

  // تسجيل الاتصال
  simpleSocketLogger.logConnection(socketId, userId);

  // حفظ الـ emit الأصلي
  const originalEmit = socket.emit;
  socket.emit = function (event, ...args) {
    simpleSocketLogger.logOutgoing(socketId, userId, event, args[0]);
    return originalEmit.apply(this, [event, ...args]);
  };

  // مراقبة الأحداث المعروفة مسبقاً
  const originalOn = socket.on;
  socket.on = function (event, listener) {
    const wrappedListener = (...args) => {
      simpleSocketLogger.logIncoming(socketId, userId, event, args[0]);
      return listener.apply(this, args);
    };
    return originalOn.call(this, event, wrappedListener);
  };

  // مراقبة قطع الاتصال
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


  io.use((socket, next) => {
    try {
      const authHeader = socket.handshake.headers.authorization;

      // 1. التحقق من وجود التوكن
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.warn(`[Socket] Socket ${socket.id} - No token provided`);
        return next(new Error('UNAUTHORIZED: No token provided'));
      }

      // 2. استخراج التوكن
      const token = authHeader.split(' ')[1];
      if (!token || token.trim() === '') {
        logger.warn(`[Socket] Socket ${socket.id} - Empty token`);
        return next(new Error('UNAUTHORIZED: Empty token'));
      }

      // 3. التحقق من صحة التوكن
      const decoded = verifyAccessToken(token);

      if (!decoded) {
        logger.warn(`[Socket] Socket ${socket.id} - Invalid or expired token`);
        return next(new Error('INVALID_TOKEN: Token is invalid or expired'));
      }

      // 4. التحقق من وجود userId
      if (!decoded.id) {
        logger.warn(`[Socket] Socket ${socket.id} - Token missing user ID`);
        return next(new Error('INVALID_TOKEN: Missing user ID'));
      }

      // 5. التحقق من صحة الدور (role)
      const allowedRoles = ['passenger', 'captain', 'admin'];
      if (!decoded.role || !allowedRoles.includes(decoded.role)) {
        logger.warn(`[Socket] Socket ${socket.id} - Invalid role: ${decoded.role}`);
        return next(new Error('INVALID_TOKEN: Invalid user role'));
      }

      // 6. حفظ البيانات في الـ socket
      socket.data.userId = decoded.id.toString();
      socket.data.role = decoded.role;
      socket.data.connectedAt = new Date().toISOString();

      // 7. تسجيل معلومات الاتصال
      logger.info(`[Socket Auth] Socket ${socket.id} authenticated as user ${decoded.id} (${decoded.role})`);

      // 8. التحقق الإضافي: إذا كان الدور passenger، تأكد من عدم وجود captainId في التوكن
      // (يمكن إضافته إذا كان التوكن يحتوي على captainId في الـ payload)
      if (decoded.role === 'passenger' && decoded.captainId) {
        logger.warn(`[Socket] Socket ${socket.id} - Passenger has captainId: ${decoded.captainId}`);
        // هذا مجرد تحذير، لا نمنع الاتصال
      }

      next();

    } catch (error) {
      // 9. معالجة الأخطاء غير المتوقعة
      logger.error(`[Socket Auth] Unexpected error for socket ${socket.id}:`, error);
      return next(new Error('AUTH_ERROR: Internal server error'));
    }
  });

  io.on('connection', (rawSocket) => {
    // تغليف السوكيت بالتسجيل
    const socket = wrapSocketWithLogging(rawSocket);

    const { userId, role } = socket.data;
    console.log(`✅ [Socket CONNECTED] ${socket.id} | user=${userId} | role=${role}`);

    // Track presence
    _addPresence(userId, socket.id);

    // Personal room
    socket.join(`user:${userId}`);

    // Role rooms
    if (role === 'passenger') {
      socket.join('passengers');
      console.log(`👤 [PASSENGER JOINED] socket:${socket.id} | user:${userId}`);
      console.log(`📊 [PASSENGER COUNT] Now ${io.sockets.adapter.rooms.get('passengers')?.size || 0} passengers online`);
    }

    // تسجيل الدخول إلى الغرف
    console.log(`📌 [Socket ROOMS] ${socket.id} joined rooms: user:${userId}${role === 'passenger' ? ', passengers' : ''}`);

    // Register per-module handlers
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

  // مراقبة أحداث الـ io العامة
  io.of('/').adapter.on('create-room', (room) => {
    console.log(`🏠 [Socket ROOM CREATE] room: ${room}`);
  });

  io.of('/').adapter.on('join-room', (room, id) => {
    console.log(`🚪 [Socket ROOM JOIN] socket: ${id} joined room: ${room}`);
  });

  io.of('/').adapter.on('leave-room', (room, id) => {
    console.log(`🚪 [Socket ROOM LEAVE] socket: ${id} left room: ${room}`);
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
  console.log(`📤 [EMIT TO USER] user:${userId} | event:${event} | data:`, data ? JSON.stringify(data).slice(0, 200) : 'null');
  io.to(`user:${userId}`).emit(event, data);
};

// Emit to all sockets inside a trip room
const emitToTrip = (tripId, event, data) => {
  if (!io) return;
  console.log(`📤 [EMIT TO TRIP] trip:${tripId} | event:${event}`);
  io.to(`trip:${tripId}`).emit(event, data);
};

// Emit to all online passengers
const emitToPassengers = (event, data) => {
  if (!io) return;
  console.log(`📤 [EMIT TO PASSENGERS] event:${event}`);
  io.to('passengers').emit(event, data);
};

// Check if a user has at least one active socket connection
const isUserOnline = (userId) => _presence.has(userId.toString());

// Get all currently online userIds
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