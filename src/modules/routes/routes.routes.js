const router = require('express').Router();
const auth   = require('../../middlewares/auth.middleware');
const c      = require('./routes.controller');

router.get('/polyline', auth, c.getPolyline);

module.exports = router;
