const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    email: { type: String, lowercase: true, unique: true, sparse: true },
    role: {
      type: String,
      enum: ['passenger', 'captain', 'admin', null],
      default: null,
    },
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String }, // URL
    isActive: { type: Boolean, default: true },
    // For OTP temporary storage
    otpCode: { type: String, select: false },
    otpExpiresAt: { type: Date, select: false },
    otpAttempts: { type: Number, default: 0, select: false },
    otpLockedUntil: { type: Date, select: false },
    // Array supports multiple devices (max 5, FIFO)
    refreshTokens: [{ type: String }],
    // FCM device tokens (max 5, FIFO)
    fcmTokens: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);