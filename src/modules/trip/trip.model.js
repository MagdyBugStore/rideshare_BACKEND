const mongoose = require('mongoose');

const VALID_STATUSES = [
  'searching',
  'pending_captain',
  'accepted',
  'on_the_way',
  'onTheWay',          // legacy alias — kept for backward compatibility
  'arrived',
  'started',
  'in_progress',
  'completed',
  'ended',             // legacy alias — kept for backward compatibility
  'cancelled_by_passenger',
  'cancelled_by_captain',
  'cancelled_by_system',
  'cancelled',         // legacy alias — kept for backward compatibility
  'no_captain_found',
];

const TRANSITIONS = {
  searching:              ['accepted', 'pending_captain', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain', 'cancelled_by_system', 'no_captain_found'],
  pending_captain:        ['accepted', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain', 'cancelled_by_system', 'no_captain_found'],
  accepted:               ['on_the_way', 'onTheWay', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
  on_the_way:             ['arrived', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
  onTheWay:               ['arrived', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
  arrived:                ['started', 'in_progress', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
  started:                ['completed', 'ended', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
  in_progress:            ['completed', 'ended', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain'],
  completed:              [],
  ended:                  [],
  cancelled:              [],
  cancelled_by_passenger: [],
  cancelled_by_captain:   [],
  cancelled_by_system:    [],
  no_captain_found:       ['searching', 'cancelled', 'cancelled_by_passenger', 'cancelled_by_captain', 'cancelled_by_system'],
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

    // ── Locations ──────────────────────────────────────────────────────
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
    pickupLocation: {
      lat:       { type: Number },
      lng:       { type: Number },
      address:   { type: String, default: '' },
      arrivedAt: { type: Date },
    },
    dropoffLocation: {
      lat:       { type: Number },
      lng:       { type: Number },
      address:   { type: String, default: '' },
      arrivedAt: { type: Date },
    },

    // ── Live location snapshots ─────────────────────────────────────────
    captainLastLocation: {
      lat:       { type: Number, default: null },
      lng:       { type: Number, default: null },
      heading:   { type: Number, default: 0 },
      speed:     { type: Number, default: 0 },
      updatedAt: { type: Date, default: null },
    },
    passengerLastLocation: {
      lat:       { type: Number, default: null },
      lng:       { type: Number, default: null },
      updatedAt: { type: Date, default: null },
    },

    // ── Polylines ───────────────────────────────────────────────────────
    polyRoute:                    { type: String, default: '' },  // legacy field — kept for compatibility
    pickupToDestinationPolyline:  { type: String, default: '' },  // full passenger route
    captainToPickupPolyline:      { type: String, default: '' },  // captain→pickup route
    currentPolyline:              { type: String, default: '' },  // active display polyline

    // ── Fare & distance ─────────────────────────────────────────────────
    distanceKm:     { type: Number, default: 0 },
    totalFare:      { type: Number, default: 0 },
    firstKmFare:    { type: Number },
    extraKmFare:    { type: Number },
    routeDistanceKm: { type: Number, default: 0 },
    gpsDistanceKm:   { type: Number, default: 0 },

    // ── Trip stats ──────────────────────────────────────────────────────
    estimatedDurationMins: { type: Number, default: 0 },
    waitingTimeSeconds:    { type: Number, default: 0 },
    travelTimeSeconds:     { type: Number, default: 0 },

    // ── Cancellation ────────────────────────────────────────────────────
    cancellationReason: { type: String, default: null },
    cancelledAt:        { type: Date },
    cancelledBy:        { type: String, enum: ['passenger', 'captain', 'system'] },

    // ── Ratings ─────────────────────────────────────────────────────────
    passengerRating:     { type: Number, min: 1, max: 5 },
    passengerRatingTags: [String],
    captainRating:       { type: Number, min: 1, max: 5 },
    captainRatingTags:   [String],

    // ── State-change timestamps ─────────────────────────────────────────
    searchStartedAt:    { type: Date },
    captainNotifiedAt:  { type: Date },
    captainRespondedAt: { type: Date },
    captainAcceptedAt:  { type: Date },
    captainOnTheWayAt:  { type: Date },
    captainArrivedAt:   { type: Date },
    tripStartedAt:      { type: Date },
    tripEndedAt:        { type: Date },

    // Legacy timestamp aliases
    acceptedAt:  Date,
    onTheWayAt:  Date,
    arrivedAt:   Date,
    startedAt:   Date,
    endedAt:     Date,
  },
  { timestamps: true }
);

tripSchema.methods.canTransitionTo = function (newStatus) {
  return (TRANSITIONS[this.status] ?? []).includes(newStatus);
};

module.exports = mongoose.model('Trip', tripSchema);
