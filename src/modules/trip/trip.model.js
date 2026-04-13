const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }, // optional
    status: {
      type: String,
      enum: ['pending', 'active', 'ended', 'cancelled'],
      default: 'pending',
    },
    startLocation: {
      lat: Number,
      lng: Number,
      address: String,
    },
    endLocation: {
      lat: Number,
      lng: Number,
      address: String,
    },
    distanceKm: { type: Number, default: 0 },
    totalFare: { type: Number, default: 0 },
    firstKmFare: { type: Number, default: 10 },
    extraKmFare: { type: Number, default: 7 },
    passengerConfirmedStart: { type: Boolean, default: false },
    captainConfirmedStart: { type: Boolean, default: false },
    passengerConfirmedEnd: { type: Boolean, default: false },
    captainConfirmedEnd: { type: Boolean, default: false },
    endRequestedBy: { type: String, enum: ['passenger', 'captain'] },
    cancellationReason: { type: String },
    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);