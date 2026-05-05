const mongoose = require('mongoose');

const recentSearchSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  placeId:       { type: String, required: true },
  mainText:      { type: String, required: true },
  secondaryText: { type: String, default: '' },
}, { timestamps: true });

recentSearchSchema.index({ userId: 1, createdAt: -1 });

const savedPlaceSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:          { type: String, enum: ['home', 'work'], required: true },
  mainText:      { type: String, required: true },
  secondaryText: { type: String, default: '' },
  lat:           { type: Number, required: true },
  lng:           { type: Number, required: true },
}, { timestamps: true });

savedPlaceSchema.index({ userId: 1, type: 1 }, { unique: true });

const RecentSearch = mongoose.model('RecentSearch', recentSearchSchema);
const SavedPlace   = mongoose.model('SavedPlace',   savedPlaceSchema);

module.exports = { RecentSearch, SavedPlace };
