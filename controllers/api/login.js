const jwt = require('../../services/jwt');
const { users } = require('../../db');
const argon = require('../../services/argon2');
const error = require('../../services/errors');

async function login(req, res, next) {
	try {
		const { username, password } = req.body;

		const foundUser = await users.findUserByUsername(username);
		if (!foundUser) {
			throw error.USER_NOT_FOUND;
		}

		const passwordVerified = await argon.verify(foundUser.password, password);
		if (!passwordVerified) {
			throw error.USERNAME_AND_PASSWORD_DIDNT_MATCH;
		}
		const token = jwt.getToken({ id: foundUser._id, username });
		return res.json({ token, username: foundUser.username });
	} catch (err) {
		next(err);
	}
}

async function signup(req, res, next) {
	try {
		const { username, password } = req.body;

		const foundUser = await users.findUserByUsername(username);
		if (foundUser) {
			const passwordVerified = await argon.verify(foundUser.password, password);
			if (!passwordVerified) {
				throw error.USER_ALREADY_EXITS;
			}

			const token = jwt.getToken({ id: foundUser._id, username });
			return res.json({ token, username: foundUser.username });
		} else {
			// create a user
			const createdUser = await users.createUser(username, password);
			const token = jwt.getToken({ id: createdUser._id, username });
			return res.json({ token, username: createdUser.username });
		}
	} catch (err) {
		next(err);
	}
}

module.exports = {
	login,
	signup,
};
