const rateLimit = require('express-rate-limit');
const responseMessages = require('../constants/messages');
const apiResponse = require('./apiResponse');

// Allows 100 requests per IP per 15-minute window.
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    return apiResponse.rateLimitExceeded(
      response,
      responseMessages[global.lang].TOO_MANY_REQUESTS,
    );
  },
});

module.exports = rateLimiter;
