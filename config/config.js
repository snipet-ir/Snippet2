const env = require('@ehcan/envparser');

const config = {
	nodeEnv: env.str('NODE_ENV', 'dev'),
	mongodb: {
		url: env.str('MONGODB', 'mongodb://localhost:27017/snippet'),
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
	jwt: {
		secretKey: env.str('JWT_SECRET', 'JWT_SECRET'),
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
			username: env.str('INIT_USERNAME', 'Ehcan'),
			password: env.str('INIT_PASSWORD', 'Ehcan'),
		},
	},
	validator: {
		joiConfigs: {
			abortEarly: false,
			allowUnknown: true,
			stripUnknown: true,
		},
		username: {
			minLength: env.num('USERNAME_MIN_LENGTH', 5),
			maxLength: env.num('USERNAME_MAX_LENGTH', 36),
		},
		password: {
			minLength: env.num('PASSWORD_MIN_LENGTH', 8),
			maxLength: env.num('PASSWORD_MAX_LENGTH', 128),
		},
	},
	recaptcha: {
		// Keys are not the actual keys :) Provided by google for test purposes
		siteKey: env.str('RECAPTCHA_SITE_KEY', '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'),
		secretKey: env.str('RECAPTCHA_SECRET_KEY', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'),
	},
};

module.exports = config;
