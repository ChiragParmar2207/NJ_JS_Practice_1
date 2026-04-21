const { StatusCodes } = require('http-status-codes');
const apiResponse = {};

apiResponse.success = (res, message, data = {}) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message,
    data,
  });
};

apiResponse.created = (res, message, data = {}) => {
  return res.status(StatusCodes.CREATED).json({
    status: 'success',
    message,
    data,
  });
};

apiResponse.error = (res, message, data = {}) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    status: 'error',
    message,
    data,
  });
};

apiResponse.unauthorized = (res, message, data = {}) => {
  return res.status(StatusCodes.UNAUTHORIZED).json({
    status: 'error',
    message,
    data,
  });
};

apiResponse.forbidden = (res, message, data = {}) => {
  return res.status(StatusCodes.FORBIDDEN).json({
    status: 'error',
    message,
    data,
  });
};

apiResponse.notFound = (res, message, data = {}) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    status: 'error',
    message,
    data,
  });
};

apiResponse.conflict = (res, message, data = {}) => {
  return res.status(StatusCodes.CONFLICT).json({
    status: 'error',
    message,
    data,
  });
};

apiResponse.rateLimitExceeded = (res, message, data = {}) => {
  return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
    status: 'error',
    message,
    data,
  });
};

apiResponse.internalServerError = (res, message, data = {}) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message,
    data,
  });
};

module.exports = apiResponse;
