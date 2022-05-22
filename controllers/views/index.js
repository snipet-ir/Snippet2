const config = require('../../config');
const path = require('path');
const files = {
	index: path.resolve('static/index.html'),
	login: path.resolve('static/login.html'),
};
const { version } = require('../../package.json');

async function index(_req, res, _next) {
	const payload = {
		version,
	};

	res.render(files.index, payload);
}

async function login(_req, res, _next) {
	const payload = {
		recaptchaSiteKey: config.recaptcha.siteKey,
		version,
	};

	res.render(files.login, payload);
}

module.exports = {
	index,
	login,
};
