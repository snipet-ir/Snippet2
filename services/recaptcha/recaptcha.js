const config = require('../../config');
const axios = require('axios');

async function verify(token) {
	if (config.nodeEnv == 'dev') {
		return true;
	}

	try {
		const response = await axios.request({
			baseURL: 'https://www.google.com/recaptcha/api/siteverify',
			method: 'GET',
			params: {
				secret: config.recaptcha.secretKey,
				response: token,
			},
		});

		return response.data.success;
	} catch (err) {
		return false;
	}
}
module.exports = {
	verify,
};
