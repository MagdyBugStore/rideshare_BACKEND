const svc = require('./routes.service');
const { sendSuccess, sendError } = require('../../utils/response.util');

const getPolyline = async (req, res, next) => {
  try {
    const { originLat, originLng, destLat, destLng } = req.query;
    if (!originLat || !originLng || !destLat || !destLng)
      return sendError(res, 'originLat, originLng, destLat, destLng are required', 400);
    sendSuccess(res, await svc.getPolyline(
      Number(originLat), Number(originLng),
      Number(destLat),   Number(destLng)
    ));
  } catch (err) { next(err); }
};

module.exports = { getPolyline };
