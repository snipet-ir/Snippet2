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
	if (response.success) {
		localStorage.setItem('token', response.token);
		localStorage.setItem('username', response.username);
		window.location.href = '/';
	} else {
		alertify.error(response.error);
	}
}

function signupErrorHandler(err) {
	alertify.error(err.responseJSON.message);
}

function loginHandler(e) {
	e.preventDefault();
	let username = $('#user').val();
	let password = $('#password').val();

	$.ajax({
		type: 'POST',
		url: '/api/login',
		data: { username, password },
		success: loginResponseHandler,
		error: loginErrorHandler,
	});
}

function signupHandler(e) {
	e.preventDefault();
	let username = $('#user').val();
	let password = $('#password').val();

	$.ajax({
		type: 'POST',
		url: '/api/signup',
		data: { username, password },
		success: signupResponseHandler,
		error: signupErrorHandler,
	});
}

$(function () {
	$('#login').click(loginHandler);
	$('#signup').click(signupHandler);
});
