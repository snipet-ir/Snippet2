const { snippets } = require('../../db');
const HttpStatus = require('http-status-codes');

async function getSnippets(req, res, next) {
	try {
		let userID = req.user._id;
		let { q } = req.query;
		let ret = await snippets.getUsersSnipets(userID, q);
		res.success(ret);
	} catch (err) {
		console.error(err);
		next(err);
	}
}

async function createSnippets(req, res, next) {
	try {
		let createRes = await snippets.upsertSnippet(req.user._id, req.body);
		res.status(HttpStatus.CREATED).success(createRes);
	} catch (err) {
		console.error(err);
		next(err);
	}
}

async function deleteSnippets(req, res, next) {
	try {
		let userID = req.user._id;
		let { id } = req.body;
		let ret = await snippets.deleteSnippet(userID, id);
		res.status(HttpStatus.NO_CONTENT).success(ret);
	} catch (err) {
		console.error(err);
		next(err);
	}
}

module.exports = {
	getSnippets,
	createSnippets,
	deleteSnippets,
};
