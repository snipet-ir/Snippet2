const jwt = require('jsonwebtoken');
const config = require('../../config');

function getToken(payload) {
	return jwt.sign(payload, config.jwt.secretKey);
}

function verify(token) {
	try {
		return jwt.verify(token, config.jwt.secretKey);
	} catch (err) {
		throw Error('Token is invalid');
	}
}

module.exports = {
	getToken,
	verify,
};
