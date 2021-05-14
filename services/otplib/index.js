const { authenticator } = require('otplib');

/**
 * Validate otp code based on user's secret
 * @param {string} secret
 * @param {string} token
 * @returns {boolean}
 */
function verify(secret, token) {
	return authenticator.verify({ token, secret });
}

module.exports = {
	verify,
};
