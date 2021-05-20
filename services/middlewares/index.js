const jwt = require('../jwt');
const { users } = require('../../db');
const { StatusCodes } = require('http-status-codes');
const cache = require('../cache');

async function check(req, res, next) {
	try {
		const token = req.headers.token;

		// Check in cache
		const cacheRes = cache.get(token);
		if (cacheRes) {
			req.user = cacheRes;
			return next();
		}

		// Check from db
		const verify = jwt.verify(token);
		if (verify) {
			req.user = await users.findUserByID(verify.id);
			cache.set(token, req.user);
			return next();
		}
	} catch (err) {
		return res.status(StatusCodes.UNAUTHORIZED).error(err.message);
	}
}

module.exports = {
	check,
};
