const { users } = require('../../db');
const argon = require('../../services/argon2');
const { StatusCodes } = require('http-status-codes');

async function updateProfile(req, res, next) {
	try {
		const { oldPassword, newPassword } = req.body;

		// given old password is wrong!
		if (!(await argon.verify(req.user.password, oldPassword))) {
			return res.status(StatusCodes.FORBIDDEN).json({ success: false, message: 'Old Password is wrong!' });
		}

		const newPasswordHash = await argon.hash(newPassword);

		await users.updatePassword(req.user._id, newPasswordHash);

		res.success({ success: true });
	} catch (err) {
		console.error(err);
		next(err);
	}
}

module.exports = {
	updateProfile,
};
