const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'],
    },
    vehicleModel: String,
    plateNumber: { type: String, unique: true, sparse: true },
    vehicleColor: String,
    documents: {
      nationalId: String,
      driverLicense: String,
      vehicleLicense: String,
      governorate: String,
      address: String,
      dateOfBirth: String,
    },
    status: {
      type: String,
      enum: ['pending_review', 'approved', 'rejected', 'banned'],
      default: 'pending_review',
    },
    rejectionReason: String,
    applicationCode: { type: String, unique: true, sparse: true },
    applicationStatus: {
      type: String,
      enum: ['pending_approval', 'approved', 'rejected'],
      default: 'pending_approval',
    },

    // Availability & presence
    isOnline: { type: Boolean, default: false },
    isOnTrip: { type: Boolean, default: false },
    socketId: { type: String },

    // Location (GeoJSON)
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
    heading: { type: Number, default: 0 },
    lastLocationAt: Date,

    // Stats
    rating: { type: Number, min: 0, max: 5, default: 0 },
    totalTrips: { type: Number, default: 0 },
  },
  { timestamps: true }
);

captainSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Captain', captainSchema);
