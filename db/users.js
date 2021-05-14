const { users } = require('./models');
const argon = require('../services/argon2');

/**
 * Use our constants to check for what the user chose.
 * @typedef {{id: ObjectId, username: string, password: string, ban: boolean, otp:{active: boolean, secret: string, backupCodes:[{code: string, active: false}]}}} User
 */

/**
 * Create a user
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
async function createUser(username, password) {
	try {
		return await users.create({ username, password: await argon.hash(password) });
	} catch (err) {
		console.error(err);
		throw err;
	}
}

/**
 * @param {string} username
 * @returns {Promise<User|null>}
 */
async function findUserByUsername(username) {
	try {
		return await users.findOne({ username: { $regex: new RegExp(username, 'i') } }).lean();
	} catch (err) {
		console.error(err);
		throw err;
	}
}

/**
 * @param {string} id
 * @returns {Promise<User|null>}
 */
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
