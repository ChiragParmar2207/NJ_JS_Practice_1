const { StatusCodes } = require('http-status-codes');
const apiResponse = {};

apiResponse.success = (res, data, message) => {
	return res.status(StatusCodes.OK).json({
		status: 'success',
		message,
		data,
	});
};

apiResponse.created = (res, data, message) => {
	return res.status(StatusCodes.CREATED).json({
		status: 'success',
		message,
		data,
	});
};

apiResponse.error = (res, data, message) => {
	return res.status(StatusCodes.BAD_REQUEST).json({
		status: 'error',
		message,
		data,
	});
};

apiResponse.unauthorized = (res, data, message) => {
	return res.status(StatusCodes.UNAUTHORIZED).json({
		status: 'error',
		message,
		data,
	});
};

apiResponse.forbidden = (res, data, message) => {
	return res.status(StatusCodes.FORBIDDEN).json({
		status: 'error',
		message,
		data,
	});
};

apiResponse.notFound = (res, data, message) => {
	return res.status(StatusCodes.NOT_FOUND).json({
		status: 'error',
		message,
		data,
	});
};

apiResponse.conflict = (res, data, message) => {
	return res.status(StatusCodes.CONFLICT).json({
		status: 'error',
		message,
		data,
	});
};

apiResponse.internalServerError = (res, data, message) => {
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		status: 'error',
		message,
		data,
	});
};

module.exports = apiResponse;
