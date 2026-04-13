const { sendError } = require('../utils/response.util');

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  // Mongoose duplicate key
  if (err.code === 11000) {
    return sendError(res, 'Duplicate field value', 400);
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return sendError(res, 'Validation error', 400, errors);
  }

  sendError(res, err.message || 'Internal server error', err.status || 500);
};

module.exports = errorHandler;