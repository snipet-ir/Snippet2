const argon = require('argon2');

async function hash(str) {
	return argon.hash(str, {
		type: argon.argon2id,
	});
}

async function verify(hashedString, rawString) {
	return argon.verify(hashedString, rawString);
}

module.exports = {
	hash,
	verify,
};
