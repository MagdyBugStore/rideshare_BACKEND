const { sendError } = require('../utils/response.util');

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Unauthorized', 401);
    }
    console.log("req user " , req.user)
    if (!allowedRoles.includes(req.user.role)) {

      return sendError(res, 'Forbidden: insufficient permissions', 403);
    }
    next();
  };
};

module.exports = { requireRole };