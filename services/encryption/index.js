const crypto = require('crypto');
const config = require('../../config');

function getInitVector() {
	return crypto.randomBytes(16).toString('hex');
}

function encrypt(initVector, message) {
	const cipher = crypto.createCipheriv(
		config.encryption.algorithm,
		Buffer.from(config.encryption.secretKey, 'hex'),
		Buffer.from(initVector, 'hex'),
	);

	let encryptedData = cipher.update(message, 'utf-8', 'hex');
	encryptedData += cipher.final('hex');
	return encryptedData;
}

function decrypt(initVector, encryptedData) {
	const decipher = crypto.createDecipheriv(
		config.encryption.algorithm,
		Buffer.from(config.encryption.secretKey, 'hex'),
		Buffer.from(initVector, 'hex'),
	);

	let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
	decryptedData += decipher.final('utf8');
	return decryptedData;
}

module.exports = {
	getInitVector,
	encrypt,
	decrypt,
};
