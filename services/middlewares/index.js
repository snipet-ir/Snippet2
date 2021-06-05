const jwt = require('../jwt');
const { users } = require('../../db');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const cache = require('../cache');
const recaptcha = require('../recaptcha');
const error = require('../errors');

async function authenticationCheck(req, res, next) {
	try {
		const token = req.headers.token;
		if (!token) {
			throw Error(ReasonPhrases.UNAUTHORIZED);
		}

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
		return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
	}
}

async function recaptchaCheck(req, res, next) {
	try {
		const { recaptchaToken } = req.body;

		const recaptchaResponse = await recaptcha.verify(recaptchaToken);
		if (!recaptchaResponse) {
			throw error.RECAPTCHA_VALIDATION;
		}
		next();
	} catch (err) {
		next(err);
	}
}

module.exports = {
	authenticationCheck,
	recaptchaCheck,
};
