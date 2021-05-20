const NodeCache = require('node-cache');
const client = new NodeCache({
	stdTTL: 60 * 60,
	checkperiod: 1 * 60,
});

function set(key, value, ttl = null) {
	client.set(key, value, ttl);
}

function get(key) {
	return client.get(key);
}

module.exports = {
	set,
	get,
};
