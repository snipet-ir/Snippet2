require('./db/_conn');
const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());
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
	next();
});

// define routes
app.use('/static', express.static(__dirname + '/static'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api', require('./routes/api/login'));
app.use('/api', require('./routes/api/main'));
app.use('/api', require('./routes/api/profile'));
app.use('/', require('./routes/views'));

app.use(require('./services/errors/handler'));

app.listen(process.env.PORT || 3000);
