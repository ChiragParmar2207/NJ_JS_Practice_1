const { logger } = require('../utils/logger');
const apiResponse = require('../utils/apiResponse');
const handleError = require('../utils/handleError');
const responseMessages = require('../constants/messages');
const authService = require('../services/auth.service');
const authController = {};

authController.register = async (req, res) => {
  try {
    const responseData = await authService.register(req.body);

    return apiResponse.created(
      res,
      responseMessages[global.lang].REGISTER_SUCCESS,
      responseData,
    );
  } catch (error) {
    logger.error('Register error', {
      email: req.body?.email,
      error: error.message,
      stack: error.stack,
    });

    return handleError(res, error);
  }
};

authController.login = async (req, res) => {
  try {
    const responseData = await authService.login(req.body);

    return apiResponse.success(
      res,
      responseMessages[global.lang].LOGIN_SUCCESS,
      responseData,
    );
  } catch (error) {
    logger.error('Login error', {
      email: req.body?.email,
      error: error.message,
      stack: error.stack,
    });

    return handleError(res, error);
  }
};

module.exports = authController;
