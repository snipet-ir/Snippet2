const jwt = require('../../services/jwt');
const { users } = require('../../db');
const argon = require('../../services/argon2');
const recaptcha = require('../../services/recaptcha');

async function login(req, res, next) {
	try {
		const { username, password, token } = req.body;

		const recaptchaResponse = await recaptcha.verify(token);
		if (!recaptchaResponse) {
			throw Error('Error on recaptcha validation');
		}

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

async function signup(req, res, next) {
	try {
		const { username, password, token } = req.body;

		const recaptchaResponse = await recaptcha.verify(token);
		if (!recaptchaResponse) {
			throw Error('Error on recaptcha validation');
		}

		let foundUser = await users.findUserByUsername(username);
		if (foundUser) {
			if (await argon.verify(foundUser.password, password)) {
				const token = jwt.getToken({ id: foundUser._id, username });
				return res.json({ success: true, token, username: foundUser.username });
			} else {
				throw Error(`Given Username is already exist`);
			}
		} else {
			// create a user
			let createdUser = await users.createUser(username, password);
			const token = jwt.getToken({ id: createdUser._id, username });
			return res.json({ success: true, token, username: createdUser.username });
		}
	} catch (err) {
		next(err);
	}
}

module.exports = {
	login,
	signup,
};
