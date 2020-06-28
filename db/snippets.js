const { snippets } = require('./models');
const mongoose = require('mongoose');
async function getUsersSnipets(userID, q) {
	try {
		return await snippets
			.find({
				$and: [
					{ $or: [{ owner: userID }, { 'collabrators.id': userID }] },
					{
						$or: [
							{ title: new RegExp(q, 'i') },
							{ description: new RegExp(q, 'i') },
							{ code: new RegExp(q, 'i') },
							{ tags: new RegExp(q, 'i') },
							{ language: new RegExp(q, 'i') },
						],
					},
				],
			})
			.sort({ updatedAt: -1 })
			.lean();
	} catch (err) {
		throw Error(`Can't get this user's snippets`);
	}
}

async function upsertSnippet(userID, { id, title, description, tags, language, code }) {
	try {
		if (id == '') {
			id = mongoose.Types.ObjectId();
		}
		let query = {
			$and: [{ _id: id }, { $or: [{ owner: userID }] }],
		};
		let data = {
			$set: {
				title,
				description,
				language,
				code,
				owner: userID,
			},
			$addToSet: { tags: { $each: tags } },
		};

		let ret = await snippets.findOneAndUpdate(query, data, { upsert: true, new: true });
		return ret;
	} catch (err) {
		throw Error(`Can't upsert this user's snippets`);
	}
}

async function deleteSnippet(userID, id) {
	try {
		return await snippets.deleteOne({
			$and: [
				{ $or: [{ owner: userID }, { 'collabrators.id': userID }] },
				{
					_id: id,
				},
			],
		});
	} catch (err) {
		throw Error(`Can't delete this user's snippets`);
	}
}

module.exports = {
	upsertSnippet,
	getUsersSnipets,
	deleteSnippet,
};
