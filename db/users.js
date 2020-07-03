const { users } = require('./models');
const argon = require('../services/argon2');

async function createUser(username, password) {
	try {
		return await users.create({ username, password: await argon.hash(password) });
	} catch (err) {
		console.error(err);
		throw err;
	}
}

async function findUserByUsername(username) {
	try {
		return await users.findOne({ username: { $regex: new RegExp(username, 'i') } }).lean();
	} catch (err) {
		console.error(err);
		throw err;
	}
}

async function findUserByID(id) {
	try {
		return await users.findById(id).lean();
	} catch (err) {
		console.error(err);
		throw err;
	}
}

async function updatePassword(userID, newPassword) {
	try {
		return await users.findByIdAndUpdate(userID, { $set: { password: newPassword } });
	} catch (err) {
		console.error(err);
		throw err;
	}
}

module.exports = {
	createUser,
	findUserByUsername,
	findUserByID,
	updatePassword,
};
