const apiResponse = require('../utils/apiResponse');

const validateRequest = (schema) => {
  return (request, response, next) => {
    const arr = ['params', 'query', 'body'];

    for (const key of arr) {
      if (schema[key]) {
        const data = request[key] || {};
        const { error, value } = schema[key].validate(data);

        if (error) {
          return apiResponse.error(response, error.details[0].message);
        }

        // Replace request[key] with sanitized/validated value
        request[key] = value;
      }
    }

    next();
  };
};

module.exports = { validateRequest };
