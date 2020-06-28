const path = require('path');

async function index(req, res, next) {
	let file = path.resolve('static/index.html');
	res.sendFile(file);
}

async function login(req, res, next) {
	let file = path.resolve('static/login.html');
	res.sendFile(file);
}

module.exports = {
	index,
	login,
};
