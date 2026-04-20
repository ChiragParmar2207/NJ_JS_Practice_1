const jwt = require('jsonwebtoken');
const configs = require('../configs/configs');

const generateToken = (payload) => {
	return jwt.sign(payload, configs.JWT_SECRET, {
		expiresIn: configs.JWT_EXPIRE_IN,
	});
};

const verifyToken = (token) => {
	return jwt.verify(token, configs.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
