const { users } = require('../../db');
const argon = require('../../services/argon2');
const { StatusCodes } = require('http-status-codes');
const error = require('../../services/errors');

async function updateProfile(req, res, next) {
	try {
		const { oldPassword, newPassword } = req.body;

		// given old password is wrong!
		const passwordVerified = await argon.verify(req.user.password, oldPassword);
		if (!passwordVerified) {
			throw error.OLD_PASSWORD_IS_WRONG;
		}

		const newPasswordHash = await argon.hash(newPassword);

		await users.updatePassword(req.user._id, newPasswordHash);

		res.status(StatusCodes.NO_CONTENT).json();
	} catch (err) {
		next(err);
	}
}

module.exports = {
	updateProfile,
};
