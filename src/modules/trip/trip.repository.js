const Trip = require('./trip.model');

const _populatedQuery = (query) =>
  query
    .populate('passengerId', 'name avatar phone')
    .populate({ path: 'captainId', populate: { path: 'userId', select: 'name avatar phone' } });

const findById = (id) => Trip.findById(id);

const findByIdPopulated = (id) => _populatedQuery(Trip.findById(id));

const findOne = (filter) => Trip.findOne(filter);

const findOnePopulated = (filter) => _populatedQuery(Trip.findOne(filter));

const create = (data) => Trip.create(data);

const saveDoc = (doc) => doc.save();

module.exports = { findById, findByIdPopulated, findOne, findOnePopulated, create, saveDoc };
