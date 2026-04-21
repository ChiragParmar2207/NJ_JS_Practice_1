const UserModel = require('../models/user.model');
const userRepository = {};

userRepository.findOne = async (filter, select = '') => {
  return UserModel.findOne(filter).select(select);
};

userRepository.findById = async (id, select = '') => {
  return UserModel.findById(id).select(select);
};

userRepository.createUser = async (userData) => {
  return UserModel.create(userData);
};

module.exports = userRepository;
