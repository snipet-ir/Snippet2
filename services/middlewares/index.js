const jwt = require('../jwt');
const { users } = require('../../db');
const HttpStatus = require('http-status-codes');

async function check(req, res, next) {
	try {
		let verify = jwt.verify(req.headers.token);
		if (verify) {
			req.user = await users.findUserByID(verify.id);
			return next();
		}
	} catch (err) {
		return res.status(HttpStatus.UNAUTHORIZED).error(err.message);
	}
}

module.exports = {
	check,
};
