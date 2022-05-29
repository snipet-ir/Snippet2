const jwt = require('../../services/jwt');
const { users } = require('../../db');
const argon = require('../../services/argon2');
const recaptcha = require('../../services/recaptcha');
const otplib = require('../../services/otplib');
const encryption = require('../../services/encryption');

async function login(req, res, next) {
	try {
		const { username, password, token, otp } = req.body;

		const recaptchaResponse = await recaptcha.verify(token);
		if (!recaptchaResponse) {
			throw Error('Error on recaptcha validation');
		}

		const foundUser = await users.findUserByUsername(username);
		if (!foundUser) {
			throw Error('User nout found');
		}

		const isPasswordCorrect = await argon.verify(foundUser.password, password);
		if (!isPasswordCorrect) {
			throw Error(`username and password didn't match`);
		}

		if (foundUser.mfa.otp.active) {
			const userOtpSecret = encryption.decrypt(foundUser.mfa.otp.iv, foundUser.mfa.otp.secret);
			if (!otplib.verify(userOtpSecret, otp)) {
				throw Error(`OTP Token is invalid`);
			}
		}

		const jwtToken = jwt.getToken({ id: foundUser._id, username });
		return res.json({ success: true, token: jwtToken, username: foundUser.username });
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

		const foundUser = await users.findUserByUsername(username);
		if (foundUser) {
			const isPasswordCorrect = await argon.verify(foundUser.password, password);
			if (!isPasswordCorrect) {
				throw Error(`Given Username is already exist`);
			}
			const jwtToken = jwt.getToken({ id: foundUser._id, username });
			return res.json({ success: true, token: jwtToken, username: foundUser.username });
		} else {
			// create a user
			const createdUser = await users.createUser(username, password);
			const jwtToken = jwt.getToken({ id: createdUser._id, username });
			return res.json({ success: true, token: jwtToken, username: createdUser.username });
		}
	} catch (err) {
		next(err);
	}
}

module.exports = {
	login,
	signup,
};
