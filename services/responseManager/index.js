function result(success, data = null) {
	return success == true ? success(data) : error(data);
}

function success(data = null) {
	var ret = {
		success: true,
	};
	if (data) {
		ret.result = data;
	}
	return ret;
}

function error(error = null) {
	var ret = {
		success: false,
	};
	if (error) {
		ret.error = error;
	}
	return ret;
}
module.exports = {
	result,
	success,
	error,
};
