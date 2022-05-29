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

/**
 * Generate OTP secret for user
 * @returns {string}
 */
function generateSecret() {
	return authenticator.generateSecret(16);
}

module.exports = {
	verify,
	generateSecret,
};
