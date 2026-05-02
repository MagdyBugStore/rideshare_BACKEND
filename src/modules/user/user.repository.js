const User = require('./user.model');

const findById = (id, projection = '-refreshToken') =>
  User.findById(id).select(projection);

const findOne = (filter, projection) =>
  User.findOne(filter, projection);

const create = (data) => User.create(data);

const updateById = (id, update, options = {}) =>
  User.findByIdAndUpdate(id, update, { new: true, ...options });

const updateOne = (filter, update) =>
  User.findOneAndUpdate(filter, update, { new: true });

module.exports = { findById, findOne, create, updateById, updateOne };
