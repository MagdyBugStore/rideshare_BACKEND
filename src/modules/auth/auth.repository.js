const userRepo = require('../user/user.repository');

const findByGoogleOrEmail = (googleId, email) =>
  userRepo.findOne({ $or: [{ googleId }, { email }] });

// MongoDB implicit array match: finds doc where refreshTokens array contains the value
const findByIdAndToken = (id, refreshToken) =>
  userRepo.findOne({ _id: id, refreshTokens: refreshToken });

const createUser = (data) => userRepo.create(data);

const updateById = (id, update) => userRepo.updateById(id, update);

const saveDoc = (doc) => doc.save();

// Push a new refresh token; $slice: -5 keeps only the 5 most recent (FIFO eviction)
const addRefreshToken = (userId, refreshToken) =>
  userRepo.updateById(userId, {
    $push: { refreshTokens: { $each: [refreshToken], $slice: -5 } },
  });

// Remove a single device's token (logout from one device)
const removeRefreshToken = (userId, refreshToken) =>
  userRepo.updateById(userId, { $pull: { refreshTokens: refreshToken } });

// Revoke all devices (security logout / password change)
const clearAllRefreshTokens = (userId) =>
  userRepo.updateById(userId, { $set: { refreshTokens: [] } });

module.exports = {
  findByGoogleOrEmail,
  findByIdAndToken,
  createUser,
  updateById,
  saveDoc,
  addRefreshToken,
  removeRefreshToken,
  clearAllRefreshTokens,
};
