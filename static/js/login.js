const notifyConfig = {
	effect: 'slide',
	autoclose: true,
};

if (localStorage.getItem('token')) {
	if (localStorage.getItem('logedOut') == 'true') {
		window.location.href = '/';
	}
}

function loginResponseHandler(response) {
	if (response.success) {
		localStorage.setItem('token', response.token);
		localStorage.setItem('username', response.username);
		localStorage.setItem('logedOut', 'false');
		window.location.href = '/';
	} else {
		new Notify({ ...notifyConfig, status: 'error', title: 'Wrong Credentials' });
	}
}

function signupResponseHandler(response) {
	if (response.success) {
		localStorage.setItem('token', response.token);
		localStorage.setItem('username', response.username);
		window.location.href = '/';
	} else {
		new Notify({ ...notifyConfig, status: 'error', title: response.error });
	}
}

function signupErrorHandler(err) {
	console.error(err);
	new Notify({ ...notifyConfig, status: 'error', title: 'Unknown Error!' });
}

function readInputs() {
	return {
		username: $('#user').val(),
		password: $('#password').val(),
		recaptchaSiteKey: $('#recaptchaSiteKey').val(),
		otp: $('#otp').val(),
	};
}

function loginHandler(e) {
	e.preventDefault();
	const { username, password, recaptchaSiteKey, otp } = readInputs();

	grecaptcha.execute(recaptchaSiteKey, { action: 'login' }).then(token => {
		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: { username, password, token, otp },
			success: loginResponseHandler,
		});
	});
}

function signupHandler(e) {
	e.preventDefault();
	const { username, password, recaptchaSiteKey } = readInputs();

	grecaptcha.execute(recaptchaSiteKey, { action: 'signup' }).then(token => {
		$.ajax({
			type: 'POST',
			url: '/api/signup',
			data: { username, password, token },
			success: signupResponseHandler,
			error: signupErrorHandler,
		});
	});
}

$(function () {
	$('#login').click(loginHandler);
	$('#signup').click(signupHandler);
});
