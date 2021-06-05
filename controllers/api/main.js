const { snippets } = require('../../db');
const { StatusCodes } = require('http-status-codes');

async function getSnippets(req, res, next) {
	try {
		const userID = req.user._id;
		const { q, public } = req.query;
		const ret =
			public == 'true' ? await snippets.getPublicSnipets(userID, q) : await snippets.getUsersSnipets(userID, q);

		res.json({ snippets: ret });
	} catch (err) {
		next(err);
	}
}

async function createSnippets(req, res, next) {
	try {
		const createRes = await snippets.upsertSnippet(req.user._id, req.body);
		res.status(StatusCodes.CREATED).json({ result: createRes });
	} catch (err) {
		next(err);
	}
}

async function deleteSnippets(req, res, next) {
	try {
		const userID = req.user._id;
		const { id } = req.body;
		const ret = await snippets.deleteSnippet(userID, id);
		res.status(StatusCodes.NO_CONTENT).json();
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getSnippets,
	createSnippets,
	deleteSnippets,
};
