// src/modules/admin/socketLogs.controller.js
const fs = require('fs');
const path = require('path');
const { sendSuccess, sendError } = require('../../utils/response.util');

const logFilePath = path.join(__dirname, '../../../logs/socket-events.log');

const getSocketLogs = async (req, res, next) => {
  try {
    const { limit = 100, type, event, userId, socketId } = req.query;
    
    if (!fs.existsSync(logFilePath)) {
      return sendSuccess(res, { logs: [], message: 'No logs file found' });
    }
    
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.trim().split('\n').filter(l => l.trim());
    
    let logs = lines.map(line => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return { raw: line };
      }
    });
    
    // تطبيق الفلاتر
    if (type) {
      logs = logs.filter(l => l.type === type);
    }
    if (event) {
      logs = logs.filter(l => l.event === event);
    }
    if (userId) {
      logs = logs.filter(l => l.userId === userId);
    }
    if (socketId) {
      logs = logs.filter(l => l.socketId === socketId);
    }
    
    // ترتيب تنازلي (الأحدث أولاً)
    logs = logs.reverse().slice(0, parseInt(limit));
    
    sendSuccess(res, {
      logs,
      total: logs.length,
      filePath: logFilePath,
    });
  } catch (error) {
    next(error);
  }
};

const getSocketStats = async (req, res, next) => {
  try {
    if (!fs.existsSync(logFilePath)) {
      return sendSuccess(res, { stats: null, message: 'No logs file found' });
    }
    
    const content = fs.readFileSync(logFilePath, 'utf8');
    const lines = content.trim().split('\n').filter(l => l.trim());
    
    const stats = {
      totalEvents: 0,
      incomingEvents: 0,
      outgoingEvents: 0,
      connections: 0,
      disconnections: 0,
      uniqueUsers: new Set(),
      eventsByType: {},
    };
    
    lines.forEach(line => {
      try {
        const log = JSON.parse(line);
        stats.totalEvents++;
        
        if (log.type === 'connection') {
          stats.connections++;
          if (log.userId) stats.uniqueUsers.add(log.userId);
        } else if (log.type === 'disconnection') {
          stats.disconnections++;
        } else if (log.type === 'event') {
          if (log.direction === 'incoming') stats.incomingEvents++;
          if (log.direction === 'outgoing') stats.outgoingEvents++;
          
          if (log.event) {
            stats.eventsByType[log.event] = (stats.eventsByType[log.event] || 0) + 1;
          }
        }
      } catch (e) {}
    });
    
    stats.uniqueUsers = stats.uniqueUsers.size;
    
    sendSuccess(res, stats);
  } catch (error) {
    next(error);
  }
};

const clearSocketLogs = async (req, res, next) => {
  try {
    if (fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, '');
      sendSuccess(res, null, 'Socket logs cleared successfully');
    } else {
      sendSuccess(res, null, 'No logs file to clear');
    }
  } catch (error) {
    next(error);
  }
};

const getConnectedUsers = async (req, res, next) => {
  try {
    const { getIo } = require('../../socket');
    const io = getIo();
    
    // الحصول على جميع الغرف
    const rooms = io.sockets.adapter.rooms;
    
    // عدد الركاب في غرفة passengers
    const passengersRoom = rooms.get('passengers');
    const passengersCount = passengersRoom?.size || 0;
    
    // الحصول على تفاصيل الركاب المتصلين
    const passengers = [];
    const captains = [];
    const allSockets = await io.fetchSockets();
    
    for (const socket of allSockets) {
      if (socket.data.role === 'passenger') {
        passengers.push({
          socketId: socket.id,
          userId: socket.data.userId,
          rooms: Array.from(socket.rooms),
        });
      } else if (socket.data.role === 'captain') {
        captains.push({
          socketId: socket.id,
          userId: socket.data.userId,
          rooms: Array.from(socket.rooms),
        });
      }
    }
    
    sendSuccess(res, {
      passengersCount,
      passengers,
      captainsCount: captains.length,
      captains,
      totalConnected: allSockets.length,
      rooms: {
        passengers: passengersCount,
        allRooms: Array.from(rooms.keys()).filter(r => !r.startsWith('/#')).slice(0, 20),
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSocketLogs,
  getSocketStats,
  clearSocketLogs,
  getConnectedUsers,
};