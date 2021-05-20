alertify.set('notifier', 'position', 'top-center');

if (localStorage.getItem('token')) {
	if (localStorage.getItem('logedOut') === true) {
		window.location.href = '/';
	}
}

function loginResponseHandler(response) {
	if (response.success) {
		localStorage.setItem('token', response.token);
		localStorage.setItem('username', response.username);
		localStorage.setItem('logedOut', false);
		window.location.href = '/';
	} else {
		alertify.error('Wrong Credentials');
	}
}

function signupResponseHandler(response) {
	if (response.success) {
		localStorage.setItem('token', response.token);
		localStorage.setItem('username', response.username);
		window.location.href = '/';
	} else {
		alertify.error(response.error);
	}
}

function signupErrorHandler(err) {
	console.error(err);
	alertify.error('Unknown Error!');
}

function loginHandler(e) {
	e.preventDefault();
	const username = $('#user').val();
	const password = $('#password').val();
	const recaptchaSiteKey = $('#recaptchaSiteKey').val();

	grecaptcha.execute(recaptchaSiteKey, { action: 'login' }).then(token => {
		console.log({ token });
		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: { username, password, token },
			success: loginResponseHandler,
		});
	});
}

function signupHandler(e) {
	e.preventDefault();
	const username = $('#user').val();
	const password = $('#password').val();
	const recaptchaSiteKey = $('#recaptchaSiteKey').val();

	grecaptcha.execute(recaptchaSiteKey, { action: 'signup' }).then(token => {
		console.log({ token });
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
