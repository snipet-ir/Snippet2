require('./db/_conn');
const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const responseManager = require('./services/responseManager');
// set middlewares
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	var json = res.json;
	res.success = function (obj) {
		json.call(this, responseManager.success(obj));
	};
	res.error = function (obj) {
		json.call(this, responseManager.error(obj));
	};
	next();
});

// define routes
app.use('/static', express.static(__dirname + '/static'));

app.use('/api', require('./routes/api/login'));
app.use('/api', require('./routes/api/main'));
app.use('/api', require('./routes/api/profile'));
app.use('/', require('./routes/views'));

app.use((error, req, res, next) => {
	return res.error(error.message);
});

app.listen(3000);
