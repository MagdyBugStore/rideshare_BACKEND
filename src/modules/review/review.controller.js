const reviewService = require('./review.service');
const { sendSuccess, sendError } = require('../../utils/response.util');

const addReview = async (req, res, next) => {
  try {
    const { tripId, rating, comment } = req.body;
    const reviewerId = req.user.id;
    // Find trip to get reviewee (captain's user id)
    const Trip = require('../trip/trip.model');
    const trip = await Trip.findById(tripId).populate('captainId');
    if (!trip) return sendError(res, 'Trip not found', 404);
    const revieweeId = trip.captainId.userId;

    const review = await reviewService.createReview(tripId, reviewerId, revieweeId, rating, comment);
    sendSuccess(res, review, 'Review submitted');
  } catch (error) {
    next(error);
  }
};

const getUserReviews = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user.id;
    const reviews = await reviewService.getReviewsForUser(userId);
    sendSuccess(res, reviews);
  } catch (error) {
    next(error);
  }
};

module.exports = { addReview, getUserReviews };