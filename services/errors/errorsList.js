const status = require('http-status-codes');

const errors = {
	UNKNOWN_ERROR: {
		status: status.INTERNAL_SERVER_ERROR,
		message: 'Unknown server error.',
	},

	// User
	USER_NOT_FOUND: {
		status: status.NOT_FOUND,
		message: 'User Not Found',
	},
	USERNAME_AND_PASSWORD_DIDNT_MATCH: {
		status: status.NOT_FOUND,
		message: `Username and Password didn't match`,
	},
};

module.exports = errors;
