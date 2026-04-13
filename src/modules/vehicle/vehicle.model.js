const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain', required: true, unique: true },
  type: { type: String, enum: ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'], required: true },
  brand: String,
  model: String,
  year: Number,
  color: String,
  plateNumber: { type: String, required: true, unique: true },
  passengerCapacity: { type: Number, default: 4 },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);