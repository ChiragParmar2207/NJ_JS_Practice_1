const joi = require('joi');

module.exports = {
  registerSchema: {
    body: joi.object({
      name: joi.string().trim().min(2).max(50).required(),
      email: joi.string().email().lowercase().trim().required(),
      password: joi.string().min(8).max(15).required(),
    }),
  },

  loginSchema: {
    body: joi.object({
      email: joi.string().email().lowercase().trim().required(),
      password: joi.string().min(8).max(15).required(),
    }),
  },
};
