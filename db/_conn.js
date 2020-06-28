const config = require('../config');

const mongoose = require('mongoose');
mongoose.connect(config.mongodb.url, config.mongodb.options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Mongodb connected');

	db.db.listCollections().toArray(function (err, collections) {
		if (err) {
			console.log(err);
			return;
		}
		let collectionsName = collections.map(el => el.name);

		if (!collectionsName.includes('Users')) {
			initSetup();
		}
	});
});

async function initSetup() {
	const { users } = require('./index');
	await users.createUser(config.initSetup.user.username, config.initSetup.user.password);
}
