const config = require('../../config');
function validateUsername(username) {
	if (/^\w+$/.test(username) === false) {
		throw Error(`Username should only contain Letters, Numbers and Underscores`);
	}

	if (username.length < config.validator.username.minLength) {
		throw Error(`Username must be at least ${config.validator.username.minLength} characters`);
	}
}

module.exports = validateUsername;
