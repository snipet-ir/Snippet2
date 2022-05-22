const { snippets } = require('./models');
const mongoose = require('mongoose');
const _ = require('lodash');

async function getUsersSnipets(userID, q) {
	try {
		const safequery = _.escapeRegExp(q);
		const safeReg = new RegExp(safequery, 'i');

		return await snippets
			.find(
				{
					$and: [
						{ $or: [{ owner: userID }, { 'collabrators.id': userID }] },
						{
							$or: [
								{ title: safeReg },
								{ description: safeReg },
								{ code: safeReg },
								{ tags: safeReg },
								{ language: safeReg },
							],
						},
					],
				},
				{
					owner: 0,
				},
			)
			.sort({ favourite: -1, updatedAt: -1 })
			.lean();
	} catch (err) {
		throw Error(`Can't get this user's snippets`);
	}
}

async function getPublicSnipets(userID, q) {
	try {
		const safequery = _.escapeRegExp(q);
		const safeReg = new RegExp(safequery, 'i');

		let result = await snippets
			.find({
				$and: [
					// { owner: { $ne: userID } },
					{ public: true },
					{
						$or: [
							{ title: safeReg },
							{ description: safeReg },
							{ code: safeReg },
							{ tags: safeReg },
							{ language: safeReg },
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
			$and: [{ _id: id.toString() }, { $or: [{ owner: userID.toString() }] }],
		};
		let data = {
			$set: {
				title: title.toString(),
				description: description.toString(),
				public: _.isBoolean(public) ? public : false,
				favourite: _.isBoolean(favourite) ? favourite : false,
				language: language.toString(),
				code: code.toString(),
				owner: userID.toString(),
			},
			$addToSet: { tags: { $each: tags.map(tag => tag.toString()) } },
		};

		return await snippets.findOneAndUpdate(query, data, { upsert: true, new: true });
	} catch (err) {
		throw Error(`Can't upsert this user's snippets`);
	}
}

async function deleteSnippet(userID, id) {
	try {
		return await snippets.deleteOne({
			$and: [
				{ $or: [{ owner: userID.toString() }, { 'collabrators.id': userID.toString() }] },
				{
					_id: id.toString(),
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
