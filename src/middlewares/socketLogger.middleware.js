// src/middlewares/socketLogger.middleware.js
const logger = require('../config/logger');
const fs = require('fs');
const path = require('path');

// إنشاء مجلد logs إذا لم يكن موجوداً
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// ملف مخصص لسجلات السوكيت
const socketLogStream = fs.createWriteStream(
  path.join(logDir, 'socket-events.log'),
  { flags: 'a' }
);

// تنسيق الوقت
const getTimestamp = () => new Date().toISOString();

// كتابة السجل في الملف وفي console
const writeLog = (type, socketId, userId, event, data, direction) => {
  const logEntry = {
    timestamp: getTimestamp(),
    type, // 'connection', 'disconnection', 'event'
    socketId,
    userId: userId || 'unknown',
    event: event || null,
    direction, // 'incoming' or 'outgoing'
    data: data ? (typeof data === 'object' ? JSON.stringify(data) : String(data)) : null,
  };
  
  const logString = JSON.stringify(logEntry) + '\n';
  
  // كتابة في الملف
  socketLogStream.write(logString);
  
  // كتابة في console بتنسيق مقروء
  if (direction === 'incoming') {
    if (data && process.env.NODE_ENV !== 'production') {
    }
  } else if (direction === 'outgoing') {
  } else if (type === 'connection') {
  } else if (type === 'disconnection') {
  }
};

// إنشاء middleware لتسجيل الأحداث الواردة والصادرة
const createSocketLogger = (io) => {
  return (socket, next) => {
    
    socket.once('connection', () => {
      writeLog('connection', socket.id, socket.data?.userId, null, null);
    });
    
    // حفظ الـ emit الأصلي لتسجيله
    const originalEmit = socket.emit;
    socket.emit = function(event, ...args) {
    
      writeLog(
        'event',
        socket.id,
        socket.data?.userId,
        event,
        args[0],
        'outgoing'
      );
      return originalEmit.apply(this, [event, ...args]);
    };
    
    const originalOn = socket.on;
    socket.on = function(event, listener) {
      const wrappedListener = (...args) => {
        writeLog(
          'event',
          socket.id,
          socket.data?.userId,
          event,
          args[0],
          'incoming'
        );
        return listener.apply(this, args);
      };
      return originalOn.call(this, event, wrappedListener);
    };
    
    next();
  };
};


const monitorIoEvents = (io) => {

  io.engine.on('connection', (socket) => {
    const socketId = socket.id;
    console.log(`🔌 [Engine.IO] New raw connection: ${socketId}`);
  });
  

  io.engine.on('connection_error', (err) => {
    console.error(`❌ [Engine.IO] Connection error:`, err.message);
    logger.error('[Socket] Engine.IO connection error', err);
  });
};

// بديل أبسط - تسجيل مباشر لكل شيء
const simpleSocketLogger = {
  // تسجيل حدث واصل
  logIncoming: (socketId, userId, event, data) => {
    writeLog('event', socketId, userId, event, data, 'incoming');
  },
  
  // تسجيل حدث صادر
  logOutgoing: (socketId, userId, event, data) => {
    writeLog('event', socketId, userId, event, data, 'outgoing');
  },
  
  // تسجيل اتصال
  logConnection: (socketId, userId) => {
    writeLog('connection', socketId, userId, null, null, null);
  },
  
  // تسجيل قطع الاتصال
  logDisconnection: (socketId, userId, reason) => {
    writeLog('disconnection', socketId, userId, null, reason, null);
  },
};

module.exports = {
  createSocketLogger,
  monitorIoEvents,
  simpleSocketLogger,
  writeLog,
};