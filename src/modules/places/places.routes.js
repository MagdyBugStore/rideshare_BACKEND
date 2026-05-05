const router = require('express').Router();
const auth   = require('../../middlewares/auth.middleware');
const c      = require('./places.controller');

router.get('/reverse',            auth, c.reverseGeocode);
router.get('/autocomplete',       auth, c.autocomplete);
router.get('/details/:placeId',   auth, c.getDetails);
router.get('/nearby',             auth, c.nearbySearch);
router.get('/recent',             auth, c.getRecentSearches);
router.post('/recent',            auth, c.saveRecentSearch);
router.get('/saved',              auth, c.getSavedPlaces);
router.post('/saved',             auth, c.saveSavedPlace);

module.exports = router;
