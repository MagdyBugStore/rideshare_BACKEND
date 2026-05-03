const mongoose = require('mongoose');

const VALID_STATUSES = ['searching', 'accepted', 'onTheWay', 'arrived', 'started', 'ended', 'cancelled'];

// Defines which transitions are legal
const TRANSITIONS = {
  searching: ['accepted', 'cancelled'],
  accepted:  ['onTheWay', 'cancelled'],
  onTheWay:  ['arrived', 'cancelled'],
  arrived:   ['started', 'cancelled'],
  started:   ['ended', 'cancelled'],
  ended:     [],
  cancelled: [],
};

const tripSchema = new mongoose.Schema(
  {
    passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    captainId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', default: null },
    carType:     { type: String, enum: ['car', 'motorcycle', 'tukutuk', 'altTukutuk'], required: true },
    status: {
      type: String,
      enum: VALID_STATUSES,
      default: 'searching',
    },
    startLocation: {
      lat:     { type: Number, required: true },
      lng:     { type: Number, required: true },
      address: { type: String },
    },
    endLocation: {
      lat:     Number,
      lng:     Number,
      address: String,
    },
    distanceKm:   { type: Number, default: 0 },
    totalFare:    { type: Number, default: 0 },
    fareBreakdown: {
      firstKm:   Number,
      firstFare: Number,
      extraKm:   Number,
      extraFare: Number,
      total:     Number,
    },
    cancellationReason: String,
    cancelledBy: { type: String, enum: ['passenger', 'captain'] },

    // State-change timestamps (one per transition)
    acceptedAt:  Date,
    onTheWayAt:  Date,
    arrivedAt:   Date,
    startedAt:   Date,
    endedAt:     Date,
    cancelledAt: Date,
  },
  { timestamps: true }
);

// Guard method used in trip.service to prevent illegal transitions
tripSchema.methods.canTransitionTo = function (newStatus) {
  return (TRANSITIONS[this.status] ?? []).includes(newStatus);
};

module.exports = mongoose.model('Trip', tripSchema);
