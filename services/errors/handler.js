const { StatusCodes } = require('http-status-codes');

module.exports = (error, req, res, next) => {
	return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
};
