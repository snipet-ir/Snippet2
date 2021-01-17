const status = require('http-status-codes');

module.exports = (error, req, res, next) => {
	return res.status(error.status || status.UNKNOWN_ERROR).json({ message: error.message });
};
