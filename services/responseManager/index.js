function result(isSucceed, data = null) {
	return isSucceed ? success(data) : error(data);
}

function success(data = null) {
	const ret = {
		success: true,
	};
	if (data) {
		ret.result = data;
	}
	return ret;
}

function error(err = null) {
	const ret = {
		success: false,
	};
	if (err) {
		ret.error = err;
	}
	return ret;
}
module.exports = {
	result,
	success,
	error,
};
