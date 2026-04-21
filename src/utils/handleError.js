const { StatusCodes } = require('http-status-codes');
const apiResponse = require('./apiResponse');
const responseMessages = require('../constants/messages');

const handleError = (res, error) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    error.message || responseMessages[global.lang].INTERNAL_SERVER_ERROR;

  const statusMap = {
    [StatusCodes.BAD_REQUEST]: apiResponse.error,
    [StatusCodes.UNAUTHORIZED]: apiResponse.unauthorized,
    [StatusCodes.FORBIDDEN]: apiResponse.forbidden,
    [StatusCodes.NOT_FOUND]: apiResponse.notFound,
    [StatusCodes.CONFLICT]: apiResponse.conflict,
  };

  const responseFn = statusMap[statusCode] || apiResponse.internalServerError;
  return responseFn(res, message);
};

module.exports = handleError;
