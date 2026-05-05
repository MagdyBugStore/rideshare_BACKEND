// src/modules/fare/fare.model.js

const mongoose = require('mongoose');

const fareSchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String,
      enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk', 'comfort', 'van'],
      required: true,
      unique: true,
    },
    baseFare: {
      type: Number,
      required: true,
      min: 0,
    },
    perKmFare: {
      type: Number,
      required: true,
      min: 0,
    },
    firstKmFare: {
      type: Number,
      required: true,
      min: 0,
    },
    extraKmFare: {
      type: Number,
      required: true,
      min: 0,
    },
    commissionPercentage: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },
    currency: {
      type: String,
      default: 'ج.م',
    },
    description: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true, 
    },
    minFare: {
      type: Number,
      default: 0,
    },
    waitingChargePerMinute: {
      type: Number,
      default: 0,
    },
    showInApp: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ إنشاء compound index للبحث السريع
fareSchema.index({ isActive: 1, displayOrder: 1 });

module.exports = mongoose.model('Fare', fareSchema);