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

module.exports = {
	username: require('./username'),
	password: require('./password'),
	login,
};
