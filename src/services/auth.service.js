const { StatusCodes } = require('http-status-codes');
const responseMessages = require('../constants/messages');
const AppError = require('../utils/appError');
const { hashPassword, comparePassword } = require('../utils/bcrypt.util');
const { generateToken } = require('../utils/jwt.util');
const userRepository = require('../repositories/user.repository');
const authService = {};

authService.register = async (body) => {
  const { name, email, password } = body;

  const existingUser = await userRepository.findOne(
    {
      email,
      status: 'active',
    },
    '+password',
  );
  if (existingUser) {
    throw new AppError(
      StatusCodes.CONFLICT,
      responseMessages[global.lang].USER_ALREADY_EXISTS,
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await userRepository.createUser({
    name: name.trim(),
    email,
    password: hashedPassword,
  });

  user.password = undefined;

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return { user, token };
};

authService.login = async (body) => {
  const { email, password } = body;

  const user = await userRepository.findOne(
    {
      email,
      status: 'active',
    },
    '+password',
  );
  if (!user) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      responseMessages[global.lang].INVALID_CREDENTIALS,
    );
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      responseMessages[global.lang].INVALID_CREDENTIALS,
    );
  }

  if (user.status !== 'active') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      responseMessages[global.lang].ACCOUNT_DEACTIVATED,
    );
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
  });

  return { user, token };
};

module.exports = authService;
