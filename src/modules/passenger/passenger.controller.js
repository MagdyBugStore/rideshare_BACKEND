const captainService = require('../captain/captain.service');
const { sendSuccess } = require('../../utils/response.util');

const getNearbyDrivers = async (req, res, next) => {
  try {
    const { lat, lng, radius = 3 } = req.query;
    const drivers = await captainService.getNearbyDrivers(
      parseFloat(lat),
      parseFloat(lng),
      parseFloat(radius)
    );
    sendSuccess(res, drivers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNearbyDrivers,
};