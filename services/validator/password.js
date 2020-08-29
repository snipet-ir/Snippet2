const config = require('../../config');
function validatePassword(password) {
	if (password.length < config.validator.password.minLength) {
		throw Error(`Password must be at least ${config.validator.password.minLength} characters`);
	}
}

module.exports = validatePassword;
