const express = require('express');
const router = express.Router();
const controller = require('./review.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/', authMiddleware, controller.addReview);
router.get('/user/:userId?', authMiddleware, controller.getUserReviews);

module.exports = router;