const config = require('../../config');
const joi = require('joi');

const login = {
	body: joi.object().keys({
		username: joi
			.string()
			.min(config.validator.username.minLength)
			.max(config.validator.username.maxLength)
			.regex(/^\w+$/)
			.required(),
		password: joi
			.string()
			.min(config.validator.password.minLength)
			.max(config.validator.password.maxLength)
			.required(),
		token: joi.string().required(),
	}),
};
const signup = login;

module.exports = {
	login,
	signup,
};
