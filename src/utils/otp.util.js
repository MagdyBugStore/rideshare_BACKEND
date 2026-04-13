const crypto = require('crypto');

const generateOtp = () => {
  // 6-digit numeric OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashOtp = (otp) => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

const verifyOtp = (plainOtp, hashedOtp) => {
  return hashOtp(plainOtp) === hashedOtp;
};

module.exports = { generateOtp, hashOtp, verifyOtp };