const rateLimit = require('express-rate-limit');

// 3 request per second for all requests
const genericLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 180,
});

// 30 request per minute for other
const loginLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 30,
});

module.exports = {
	genericLimiter,
	loginLimiter,
};
