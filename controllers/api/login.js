const config = require('../../config');
const jwt = require('../../services/jwt');
const { users } = require('../../db');
const argon = require('../../services/argon2');

async function login(req, res, next) {
	try {
		const { username, password } = req.body;

		// TODO:check inputs
		let foundUser = await users.findUserByUsername(username);
		if (!foundUser) {
			throw Error('User nout found');
		}

		if (await argon.verify(foundUser.password, password)) {
			const token = jwt.getToken({ id: foundUser._id, username });
			return res.json({ success: true, token, username: foundUser.username });
		} else {
			throw Error(`username and password didn't match`);
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
}

module.exports = {
	login,
};
