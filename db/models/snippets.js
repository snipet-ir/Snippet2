const mongoose = require('mongoose');

const schema = mongoose.Schema(
	{
		title: String,
		description: { type: String, required: false },
		tags: [String],
		language: String,
		code: String,

		public: { type: Boolean, default: false, index: true },

		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Users',
			index: true,
		},

		collabrators: [
			{
				_id: false,
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Users',
					index: true,
				},
				access: { type: String, enum: ['read', 'write'] },
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
module.exports = mongoose.model('Snippets', schema, 'Snippets');
