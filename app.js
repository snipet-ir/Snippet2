require('./db/_conn');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const responseManager = require('./services/responseManager');
const rateLimitter = require('./services/rateLimitter');

// set middlewares
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
	res.set(
		'Content-Security-Policy',
		[
			`default-src 'self' https://*.google.com https://*.gstatic.com`,
			`style-src 'self' 'unsafe-inline'`,
			`object-src 'self'`,
		].join('; '),
	);

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

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api', rateLimitter.loginLimiter, require('./routes/api/login'));
app.use('/api', rateLimitter.genericLimiter, require('./routes/api/main'));
app.use('/api', rateLimitter.genericLimiter, require('./routes/api/profile'));
app.use('/', rateLimitter.genericLimiter, require('./routes/views'));

app.use((error, req, res, next) => {
	return res.error(error.message);
});

app.listen(process.env.PORT || 3000);
