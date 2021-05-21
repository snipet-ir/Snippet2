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
		token: joi.string().required().allow(null, ''),
	}),
};
const signup = login;

const updateProfile = {
	body: joi.object().keys({
		oldPassword: joi
			.string()
			.min(config.validator.password.minLength)
			.max(config.validator.password.maxLength)
			.required(),
		newPassword: joi
			.string()
			.min(config.validator.password.minLength)
			.max(config.validator.password.maxLength)
			.required(),
	}),
};

const getSnippet = {
	query: joi.object().keys({
		q: joi.string().allow(null, ''),
		public: joi.string().valid('true', 'false').required(),
	}),
};

const createSnippet = {
	body: joi.object().keys({
		id: joi.string().length(24).allow(null, ''),
		title: joi.string().min(3).max(72).required(),
		description: joi.string().min(3).max(72).allow(null, ''),
		public: joi.boolean().required(),
		favourite: joi.boolean().required(),
		tags: joi.array().items(joi.string()).required(),
		language: joi.string().allow(null, ''),
		code: joi.string().allow(null, ''),
	}),
};

const deleteSnippet = {
	body: joi.object().keys({
		id: joi.string().length(24).required(),
	}),
};

module.exports = {
	login,
	signup,
	updateProfile,
	getSnippet,
	createSnippet,
	deleteSnippet,
};
