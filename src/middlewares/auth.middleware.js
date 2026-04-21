const responseMessages = require('../constants/messages');
const apiResponse = require('../utils/apiResponse');
const { logger } = require('../utils/logger');
const { verifyToken } = require('../utils/jwt.util');
const userRepository = require('../repositories/user.repository');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return apiResponse.unauthorized(
        res,
        responseMessages[global.lang].TOKEN_MISSING,
      );
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      logger.error('Auth middleware error', {
        error: error.message,
        stack: error.stack,
      });

      return apiResponse.unauthorized(
        res,
        responseMessages[global.lang].TOKEN_INVALID,
      );
    }

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return apiResponse.unauthorized(
        res,
        responseMessages[global.lang].TOKEN_INVALID,
      );
    }

    if (user.status !== 'active') {
      return apiResponse.unauthorized(
        res,
        responseMessages[global.lang].ACCOUNT_DEACTIVATED,
      );
    }

    req.user = user;

    return next();
  } catch (error) {
    logger.error('Auth middleware error', {
      error: error.message,
      stack: error.stack,
    });

    return apiResponse.internalServerError(
      res,
      responseMessages[global.lang].INTERNAL_SERVER_ERROR,
    );
  }
};

module.exports = authenticate;
