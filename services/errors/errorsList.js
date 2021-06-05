const { StatusCodes } = require('http-status-codes');

const errors = {
	UNKNOWN_ERROR: {
		status: StatusCodes.INTERNAL_SERVER_ERROR,
		message: 'Unknown server error',
	},

	USER_NOT_FOUND: {
		status: StatusCodes.NOT_FOUND,
		message: 'User Not Found',
	},
	USERNAME_AND_PASSWORD_DIDNT_MATCH: {
		status: StatusCodes.NOT_FOUND,
		message: `Username and Password didn't match`,
	},
	OLD_PASSWORD_IS_WRONG: {
		status: StatusCodes.FORBIDDEN,
		message: `Old Password is wrong`,
	},
	USER_ALREADY_EXITS: {
		status: StatusCodes.BAD_REQUEST,
		message: `Given Username is already exist`,
	},
	RECAPTCHA_VALIDATION: {
		status: StatusCodes.BAD_REQUEST,
		message: `Error on recaptcha validation`,
	},
};

module.exports = errors;
