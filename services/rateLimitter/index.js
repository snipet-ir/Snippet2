const rateLimit = require('express-rate-limit');
const config = require('../../config');
// 3 request per second for all requests
const genericLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: config.rateLimitter.generic,
});

// 30 request per minute for other
const loginLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: config.rateLimitter.login,
});

module.exports = {
	genericLimiter,
	loginLimiter,
};
