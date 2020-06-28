const mongoose = require('mongoose');

const schema = mongoose.Schema(
	{
		username: { type: String, unique: true },
		password: String,
		ban: { type: Boolean, default: false },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
module.exports = mongoose.model('Users', schema, 'Users');
