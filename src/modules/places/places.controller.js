const svc = require('./places.service');
const { sendSuccess, sendError } = require('../../utils/response.util');

const reverseGeocode = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return sendError(res, 'lat and lng are required', 400);
    sendSuccess(res, await svc.reverseGeocode(Number(lat), Number(lng)));
  } catch (err) { next(err); }
};

const autocomplete = async (req, res, next) => {
  try {
    const { input, lat, lng } = req.query;
    if (!input?.trim()) return sendError(res, 'input is required', 400);
    sendSuccess(res, await svc.autocomplete(input, lat, lng));
  } catch (err) { next(err); }
};

const getDetails = async (req, res, next) => {
  try {
    sendSuccess(res, await svc.getDetails(req.params.placeId));
  } catch (err) { next(err); }
};

const nearbySearch = async (req, res, next) => {
  try {
    const { lat, lng, radius = 1500, limit = 10 } = req.query;
    if (!lat || !lng) return sendError(res, 'lat and lng are required', 400);
    sendSuccess(res, await svc.nearbySearch(Number(lat), Number(lng), Number(radius), Number(limit)));
  } catch (err) { next(err); }
};

const getRecentSearches = async (req, res, next) => {
  try {
    sendSuccess(res, await svc.getRecentSearches(req.user.id));
  } catch (err) { next(err); }
};

const saveRecentSearch = async (req, res, next) => {
  try {
    const { placeId, mainText, secondaryText } = req.body;
    if (!placeId || !mainText) return sendError(res, 'placeId and mainText are required', 400);
    await svc.saveRecentSearch(req.user.id, { placeId, mainText, secondaryText });
    sendSuccess(res, null, 'Saved');
  } catch (err) { next(err); }
};

const getSavedPlaces = async (req, res, next) => {
  try {
    sendSuccess(res, await svc.getSavedPlaces(req.user.id));
  } catch (err) { next(err); }
};

const saveSavedPlace = async (req, res, next) => {
  try {
    const { type, mainText, secondaryText, lat, lng } = req.body;
    if (!type || !mainText || lat == null || lng == null)
      return sendError(res, 'type, mainText, lat, lng are required', 400);
    sendSuccess(res, await svc.saveSavedPlace(req.user.id, { type, mainText, secondaryText, lat, lng }));
  } catch (err) { next(err); }
};

module.exports = { reverseGeocode, autocomplete, getDetails, nearbySearch, getRecentSearches, saveRecentSearch, getSavedPlaces, saveSavedPlace };
