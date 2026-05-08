const Trip = require('./trip.model');

const _populatedQuery = (query) =>
  query
    .populate('passengerId', 'name avatar phone')
    .populate({ path: 'captainId', populate: { path: 'userId', select: 'name avatar phone' } });

const findById = (id) => Trip.findById(id);

const findByIdPopulated = (id) => _populatedQuery(Trip.findById(id));

const findOne = (filter, options = {}) => {
  let q = Trip.findOne(filter);
  if (options.sort) q = q.sort(options.sort);
  return q;
};

const findOnePopulated = (filter) => _populatedQuery(Trip.findOne(filter));

const create = (data) => Trip.create(data);

const saveDoc = (doc) => doc.save();

// Atomic claim: only succeeds if trip is still searchable (prevents race conditions)
const atomicAccept = (tripId, captainId) =>
  Trip.findOneAndUpdate(
    { _id: tripId, status: { $in: ['searching', 'pending_captain'] } },
    { $set: { captainId, status: 'accepted', acceptedAt: new Date(), captainAcceptedAt: new Date() } },
    { new: true },
  );

const findByIdAndUpdate = (id, update) => Trip.findByIdAndUpdate(id, update, { new: false });

module.exports = { findById, findByIdPopulated, findOne, findOnePopulated, findByIdAndUpdate, create, saveDoc, atomicAccept };
