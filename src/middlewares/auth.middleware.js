const { verifyAccessToken } = require('../utils/jwt.util');
const { sendError } = require('../utils/response.util');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'No token provided', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return sendError(res, 'Invalid or expired token', 401);
  }

  req.user = decoded; // { id, role }
  next();
};

module.exports = authMiddleware;