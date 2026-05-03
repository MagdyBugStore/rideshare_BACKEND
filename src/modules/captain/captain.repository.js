const Captain = require('./captain.model');

const findById = (id) => Captain.findById(id);

const findByUserId = (userId) => Captain.findOne({ userId });

const findByUserIdPopulated = (userId) =>
  Captain.findOne({ userId }).populate('userId', 'name avatar');

const findNearby = (lng, lat, radiusKm = 5, carType = null) => {
  const filter = {
    status: 'approved',
    isOnline: true,
    isOnTrip: false,
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: radiusKm * 1000,
      },
    },
  };
  if (carType) filter.vehicleType = carType;
  return Captain.find(filter).populate('userId', 'name avatar phone').lean();
};

const updateById = (id, update) =>
  Captain.findByIdAndUpdate(id, update, { new: true });

const updateByUserId = (userId, update) =>
  Captain.findOneAndUpdate({ userId }, update, { new: true });

const saveDoc = (doc) => doc.save();

module.exports = {
  findById,
  findByUserId,
  findByUserIdPopulated,
  findNearby,
  updateById,
  updateByUserId,
  saveDoc,
};
