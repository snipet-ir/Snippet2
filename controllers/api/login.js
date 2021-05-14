const config = require('../../config');
const jwt = require('../../services/jwt');
const { users } = require('../../db');
const argon = require('../../services/argon2');
const validator = require('../../services/validator');
const otp = require('../../services/otplib');

async function login(req, res, next) {
	try {
		const { username, password } = req.body;

		// validate inputs
		validator.username(username);
		validator.password(password);

		let foundUser = await users.findUserByUsername(username);
		if (!foundUser) {
			throw Error('User nout found');
		}

		const passwordVerified = await argon.verify(foundUser.password, password);
		if (!passwordVerified) {
			throw Error(`username and password didn't match`);
		}

		if (foundUser.otp.active) {
			if (!'token' in req.body) {
				throw Error(`You should provide otp code for login`);
			}

			const { token } = req.body;
			if (!otp.verify(foundUser.otp.secret, token)) {
				throw Error(`OTP Token is invalid`);
			}
		}

		const token = jwt.getToken({ id: foundUser._id, username });
		return res.json({ success: true, token, username: foundUser.username });
	} catch (err) {
		next(err);
	}
}

async function signup(req, res, next) {
	try {
		const { username, password } = req.body;

		// validate inputs
		validator.username(username);
		validator.password(password);

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
