const { snippets } = require('./models');
const mongoose = require('mongoose');

async function getUsersSnipets(userID, q) {
	try {
		return await snippets
			.find(
				{
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
				},
				{
					owner: 0,
				}
			)
			.sort({ favourite: -1, updatedAt: -1 })
			.lean();
	} catch (err) {
		throw Error(`Can't get this user's snippets`);
	}
}

async function getPublicSnipets(userID, q) {
	try {
		let result = await snippets
			.find({
				$and: [
					// { owner: { $ne: userID } },
					{ public: true },
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
			.populate('owner')
			.sort({ updatedAt: -1 })
			.lean();

		for (let i = 0; i < result.length; i++) {
			result[i].editAble = result[i].owner._id.toString() == userID.toString();
			result[i].owner = result[i].owner.username;
		}
		return result;
	} catch (err) {
		throw Error(`Can't get this user's snippets`);
	}
}

async function upsertSnippet(userID, { id, title, description, public, favourite, tags, language, code }) {
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
				public,
				favourite,
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
	getPublicSnipets,
	getUsersSnipets,
	deleteSnippet,
};
