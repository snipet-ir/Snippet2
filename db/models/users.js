const mongoose = require('mongoose');

const schema = mongoose.Schema(
	{
		username: { type: String, unique: true },
		password: String,
		ban: { type: Boolean, default: false },
		mfa: {
			otp: {
				active: { type: Boolean, default: false },
				secret: { type: String, default: '' },
				iv: { type: String, default: '' },
				backupCodes: [
					{
						code: String,
						active: false,
					},
				],
			},
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);
module.exports = mongoose.model('Users', schema, 'Users');
