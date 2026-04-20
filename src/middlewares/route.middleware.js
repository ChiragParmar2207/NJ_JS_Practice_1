const validateRequest = (schema) => {
	return (req, res, next) => {
		const arr = ['params', 'query', 'body'];

		for (const key of arr) {
			if (schema[key]) {
				const { error, value } = schema[key].validate(req[key]);
				if (error) {
					return res.status(StatusCodes.BAD_REQUEST).json({
						status: 'error',
						message: error.details[0].message,
						data: {},
					});
				}

				req[key] = value;
			}
		}

		next();
	};
};

module.exports = { validateRequest };
