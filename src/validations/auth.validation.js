const joi = require('joi');
const objectId = require('joi-objectid')(joi);

module.exports = {
	registerSchema: {
		body: joi.object({
			name: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().required(),
		}),
	},

	loginSchema: {
		body: joi.object({
			email: joi.string().email().required(),
			password: joi.string().required(),
		}),
	},
};
