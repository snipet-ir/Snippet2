const config = {
	mongodb: {
		url: process.env.MONGODB || 'mongodb://localhost:27017/snippet',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		},
	},
	jwt: {
		secretKey: process.env.JWT_SECRET || 'JWT_SECRET',
	},
	cookie: {
		options: {
			maxAge: 900000,
			httpOnly: true,
			secure: true,
		},
	},
	initSetup: {
		user: {
			username: process.env.INIT_USERNAME || 'Ehcan',
			password: process.env.INIT_PASSWORD || 'Ehcan',
		},
	},
};

module.exports = config;
