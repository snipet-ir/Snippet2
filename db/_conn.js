const config = require('../config');

const mongoose = require('mongoose');
mongoose.connect(config.mongodb.url, config.mongodb.options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
	console.log('Mongodb connected');

	try {
		const collections = await db.db.listCollections().toArray();
		const hasUserCollection = collections.some(collection => collection.name === 'Users');
		if (!hasUserCollection) {
			console.log('Init setup project, creating admin user now');
			await initSetup();
		}
	} catch (err) {
		console.error(err);
		return;
	}
});

function initSetup() {
	const { users } = require('./index');
	return users.createUser(config.initSetup.user.username, config.initSetup.user.password);
}
