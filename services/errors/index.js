const BaseError = require('./base-error');
const errors = require('./errorsList');

module.exports = new Proxy(errors, {
	get: function (obj, prop) {
		return new BaseError(obj[prop]);
	},
});
