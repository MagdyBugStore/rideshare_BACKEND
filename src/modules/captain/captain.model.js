// src/modules/captain/captain.model.js

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
    vehicleModel: {
      type: String,
      // غير مطلوب
    },
    plateNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    vehicleColor: {
      type: String,
    },
    lastLocationAt: {
      type: Date,
    },
    documents: {
      nationalId: String,
      driverLicense: String,
      vehicleLicense: String,
      governorate: String,
      address: String,
      dateOfBirth: { type: String },
    },
    status: {
      type: String,
      enum: ['pending_review', 'approved', 'rejected', 'banned'],
      default: 'pending_review',
    },
    rejectionReason: String,
    isOnline: {
      type: Boolean,
      default: false,
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    totalTrips: {
      type: Number,
      default: 0,
    },
    applicationCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    applicationStatus: {
      type: String,
      enum: ['pending_approval', 'approved', 'rejected'],
      default: 'pending_approval',
    },
  },
  { timestamps: true }
);

// فهرس جغرافي
captainSchema.index({ location: '2dsphere' });

const Captain = mongoose.model('Captain', captainSchema);
module.exports = Captain;