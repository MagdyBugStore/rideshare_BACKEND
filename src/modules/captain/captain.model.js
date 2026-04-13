const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    vehicleType: {
      type: String,
      enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'],
      required: true,
    },
    lastLocationAt: { type: Date },
    vehicleModel: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    documents: {
      nationalId: { type: String }, // Cloudinary URL
      driverLicense: { type: String },
      vehicleLicense: { type: String },
    },
    status: {
      type: String,
      enum: ['pending_review', 'approved', 'rejected', 'banned'],
      default: 'pending_review',
    },
    rejectionReason: { type: String },
    isOnline: { type: Boolean, default: false },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    totalTrips: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 2dsphere index for geo queries
captainSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Captain', captainSchema);