if (localStorage.getItem('token')) {
	window.location.href = '/';
}

function loginResponseHandler(response) {
	if (response.success) {
		localStorage.setItem('token', response.token);
		window.location.href = '/';
	} else {
		alert('Wrong Credentials');
	}
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
	});
}

$('#login').click(loginHandler);
