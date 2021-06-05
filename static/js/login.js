alertify.set('notifier', 'position', 'top-center');

if (localStorage.getItem('token')) {
	if (localStorage.getItem('logedOut') === true) {
		window.location.href = '/';
	}
}

function loginResponseHandler(response) {
	localStorage.setItem('token', response.token);
	localStorage.setItem('username', response.username);
	localStorage.setItem('logedOut', false);
	window.location.href = '/';
}

function loginErrorHandler(err) {
	alertify.error(err.responseJSON.message);
}

function signupResponseHandler(response) {
	localStorage.setItem('token', response.token);
	localStorage.setItem('username', response.username);
	localStorage.setItem('logedOut', false);
	window.location.href = '/';
}

function signupErrorHandler(err) {
	alertify.error(err.responseJSON.message);
}

function loginHandler(e) {
	e.preventDefault();
	const username = $('#user').val();
	const password = $('#password').val();
	const recaptchaSiteKey = $('#recaptchaSiteKey').val();

	grecaptcha.execute(recaptchaSiteKey, { action: 'login' }).then(recaptchaToken => {
		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: { username, password, recaptchaToken },
			success: loginResponseHandler,
			error: loginErrorHandler,
		});
	});
}

function signupHandler(e) {
	e.preventDefault();
	const username = $('#user').val();
	const password = $('#password').val();
	const recaptchaSiteKey = $('#recaptchaSiteKey').val();

	grecaptcha.execute(recaptchaSiteKey, { action: 'signup' }).then(recaptchaToken => {
		$.ajax({
			type: 'POST',
			url: '/api/signup',
			data: { username, password, recaptchaToken },
			success: signupResponseHandler,
			error: signupErrorHandler,
		});
	});
}

$(function () {
	$('#login').click(loginHandler);
	$('#signup').click(signupHandler);
});
