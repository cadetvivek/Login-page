// utils/hash.js
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

module.exports = { hashPassword };
