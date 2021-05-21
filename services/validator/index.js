const config = require('../../config');
const schema = require('./schema');

function login(req, res, next) {
	try {
		const { error } = schema.login.body.validate(req.body, config.validator.joiConfigs);
		if (error) {
			throw Error(error);
		}
	} catch (err) {
		next(err);
	}
}

function signup(req, res, next) {
	try {
		const { error } = schema.signup.body.validate(req.body, config.validator.joiConfigs);
		if (error) {
			throw Error(error);
		}
	} catch (err) {
		next(err);
	}
}

module.exports = {
	login,
	signup,
};
