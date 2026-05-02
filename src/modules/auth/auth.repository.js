const userRepo = require('../user/user.repository');

const findByGoogleOrEmail = (googleId, email) =>
  userRepo.findOne({ $or: [{ googleId }, { email }] });

const findByIdAndToken = (id, refreshToken) =>
  userRepo.findOne({ _id: id, refreshToken }, '+refreshToken');

const createUser = (data) => userRepo.create(data);

const updateById = (id, update) => userRepo.updateById(id, update);

const saveDoc = (doc) => doc.save();

const clearRefreshToken = (userId) =>
  userRepo.updateById(userId, { $unset: { refreshToken: 1 } });

module.exports = {
  findByGoogleOrEmail,
  findByIdAndToken,
  createUser,
  updateById,
  saveDoc,
  clearRefreshToken,
};
