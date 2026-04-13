const Review = require('./review.model');
const Captain = require('../captain/captain.model');
const Trip = require('../trip/trip.model');

const createReview = async (tripId, reviewerId, revieweeId, rating, comment) => {
  const existing = await Review.findOne({ tripId, reviewerId });
  if (existing) throw new Error('You already reviewed this trip');

  const review = await Review.create({ tripId, reviewerId, revieweeId, rating, comment });

  // Update captain's average rating
  const captain = await Captain.findOne({ userId: revieweeId });
  if (captain) {
    const allReviews = await Review.find({ revieweeId });
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    captain.rating = Math.round(avg * 10) / 10;
    await captain.save();
  }

  return review;
};

const getReviewsForUser = async (userId) => {
  return await Review.find({ revieweeId: userId }).populate('reviewerId', 'name avatar');
};

module.exports = { createReview, getReviewsForUser };