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
		alertify.error(response.error);
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
	let username = $('#user').val();
	let password = $('#password').val();
	let token = $('#token').val();

	$.ajax({
		type: 'POST',
		url: '/api/login',
		data: { username, password, token },
		success: loginResponseHandler,
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
