// src/utils/code.util.js

const generateApplicationCode = () => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let code = 'WAS-';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

module.exports = { generateApplicationCode };