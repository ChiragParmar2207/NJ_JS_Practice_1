const bcrypt = require('bcrypt');
const configs = require('../configs/configs');

const hashPassword = async (password) => {
  return bcrypt.hash(password, configs.PASSWORD_ENCRYPTION_LEVEL);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
