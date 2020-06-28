let DATA;
let TAGS = new Set();
const languages = {
	c: 'c.png',
	cs: 'cs.png',
	csharp: 'cs.png',
	css: 'css.png',
	docker: 'docker.png',
	git: 'git.png',
	html: 'html.png',
	java: 'java.png',
	javascript: 'js.png',
	js: 'js.png',
	linux: 'linux.png',
	mongodb: 'mongodb.png',
	mysql: 'mysql.png',
	nodejs: 'nodejs.png',
	other: 'other.png',
	php: 'php.png',
	py: 'py.png',
	python: 'py.png',
	redis: 'redis.png',
	sql: 'mysql.png',
	ts: 'ts.png',
	typescript: 'ts.png',
};

alertify.set('notifier', 'position', 'top-center');

function getSnippetsData() {
	let q = $('#search-input').val();
	$.ajax({
		type: 'GET',
		url: '/api/snippets',
		headers: {
			token: localStorage.getItem('token') || '',
		},
		data: { q },
		success: snippetsResponseHandler,
		error: snippetsErrorHandler,
	});
}

function snippetsResponseHandler(response) {
	if (!response.success) {
		console.error('Error on loading Snippets');
		return;
	}

	DATA = response.result;

	$('main.snippets').empty();
	response.result.forEach(el => {
		$('main.snippets').append(getCodeTemplate(el));
	});
	setCardCodeClickHandler();
}

function snippetsErrorHandler(err) {
	if (err.status == 401) {
		window.location.href = '/login';
	} else {
		alertify.error('🍩 Unknown Error 🎈');
	}
}

function getCodeTemplate(obj) {
	let tagsString = '';
	obj.tags.forEach(el => {
		TAGS.add(el);
		tagsString += `<span class="badge badge-primary mr-1">${el}</span>`;
	});
	let template = `
	<div class="card-code d-flex align-items-center p-3 my-3 cards-bg rounded box-shadow" data-id="${obj._id}">
		<img
			class="mr-3"
			src="/static/languages/${languages[obj.language] || languages.other}"
			alt="${obj.language}"
			width="48" height="48"/>
		<div class="lh-100">
			<h6 class="mb-0 lh-100">${obj.title}</h6>
			${tagsString}<br>
			<small>${obj.description}</small>
		</div>
	</div>
	`;
	return template;
}

function setCardCodeClickHandler() {
	$('.card-code').click(function (e) {
		e.preventDefault();
		let id = $(this).data('id');
		openModal(id);
	});
}

function openModal(id) {
	let codeItem = DATA.find(el => el._id == id);

	$('.modal-body pre code').text(codeItem.code.replace(/\\n/g, '\n'));
	$('#copyToClipboard').data('id', codeItem._id);
	$('#editSnippet').data('id', codeItem._id);
	$('#deleteSnippet').data('id', codeItem._id);

	$('pre code').each(function (i, block) {
		hljs.highlightBlock(block);
	});

	$('.modal-body form, #edit__cancel, #edit__save').hide();
	$('.modal-body pre, #editSnippet, #deleteSnippet').show();
	loadTagsInSelect();

	$('#code-modal').modal('show');
}

function copyToClipboardHandler(e) {
	e.preventDefault();
	let id = $(this).data('id');
	let codeItem = DATA.find(el => el._id == id);

	copyToClipboard(codeItem.code);
}

function editSnippetHandler(e) {
	e.preventDefault();
	let id = $(this).data('id');
	let codeItem = DATA.find(el => el._id == id);

	$('.modal-body pre, #editSnippet').hide();

	$('.modal-body form #edit__id').val(codeItem._id);
	$('.modal-body form #edit__title').val(codeItem.title);
	$('.modal-body form #edit__description').val(codeItem.description);
	$('.modal-body form #edit__code').val(codeItem.code);
	$('.modal-body form #edit__language').val(codeItem.language).trigger('change');
	$('.modal-body form #edit__tags').val(codeItem.tags).trigger('change');
	$('.modal-body form, #edit__cancel, #edit__save').show();
}

function addSnippetHandler(e) {
	e.preventDefault();

	$('.modal-body pre, #editSnippet, #deleteSnippet').hide();

	$('.modal-body form #edit__id').val('');
	$('.modal-body form #edit__title').val('');
	$('.modal-body form #edit__description').val('');
	$('.modal-body form #edit__code').val('');
	$('.modal-body form #edit__language').val('').trigger('change');
	$('.modal-body form #edit__tags').val([]).trigger('change');
	$('.modal-body form, #edit__cancel, #edit__save').show();

	loadTagsInSelect();
	$('#code-modal').modal('show');
}

function editCancelHandler(e) {
	e.preventDefault();
	$('.modal-body form, #edit__cancel, #edit__save').hide();
	$('.modal-body pre, #editSnippet').show();
}

function editSaveHandler(e) {
	e.preventDefault();

	let id = $('.modal-body form #edit__id').val();
	let title = $('.modal-body form #edit__title').val();
	let description = $('.modal-body form #edit__description').val();
	let code = $('.modal-body form #edit__code').val();
	let language = $('.modal-body form #edit__language').val();
	let tags = $('.modal-body form #edit__tags').val();

	upsert({ id, title, description, code, language, tags });
}

function upsert({ id, title, description, code, language, tags }) {
	$.ajax({
		type: 'POST',
		url: '/api/snippets',
		headers: {
			token: localStorage.getItem('token') || '',
		},
		data: JSON.stringify({ id, title, description, code, language, tags }),
		contentType: 'application/json',
		dataType: 'json',
		success: function (response) {
			$('#code-modal').modal('hide');
			getSnippetsData();
		},
	});
}

function searchChangeHandler(e) {
	e.preventDefault();
	getSnippetsData();
}

function loadLanguagesInSelect() {
	for (const key in languages) {
		$('#edit__language').append(`<option>${key}</option>`);
	}
	$('#edit__language').select2({
		dropdownParent: $('#code-modal .modal-content'),
	});
}

function loadTagsInSelect() {
	$('#edit__tags').empty();
	TAGS.forEach(el => {
		$('#edit__tags').append(`<option>${el}</option>`);
	});
	$('#edit__tags').select2({
		dropdownParent: $('#code-modal .modal-content'),
		tags: true,
	});
}

function logoutHandler(e) {
	e.preventDefault();
	localStorage.clear();
	window.location.href = '/login';
}

function profileHandler(e) {
	e.preventDefault();
	// TODO: open profile
}

function deleteSnippetHandler(e) {
	let id = $(this).data('id');
	alertify
		.confirm(
			'Delete?',
			'Are You Sure?',
			function () {
				$.ajax({
					type: 'DELETE',
					url: '/api/snippets',
					data: { id },
					headers: {
						token: localStorage.getItem('token') || '',
					},
					success: function (response) {
						alertify.success('Snippet deleted!');
						getSnippetsData();
						$('#code-modal').modal('hide');
					},
					error: function () {
						alertify.error('Error on Delete this Snippet!');
					},
				});
			},
			function () {}
		)
		.set('modal', true);
}

$(function () {
	$('#copyToClipboard').click(copyToClipboardHandler);
	$('#editSnippet').click(editSnippetHandler);
	$('#deleteSnippet').click(deleteSnippetHandler);
	$('#addSnippet').click(addSnippetHandler);
	$('#edit__cancel').click(editCancelHandler);
	$('#edit__save').click(editSaveHandler);
	$('#search-input').keyup(searchChangeHandler);
	$('#logout').click(logoutHandler);
	$('#profile').click(profileHandler);

	loadLanguagesInSelect();

	getSnippetsData();
});

function copyToClipboard(text) {
	let dummy = document.createElement('textarea');
	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	document.execCommand('copy');
	document.body.removeChild(dummy);

	navigator.clipboard.writeText(text).then(
		function () {
			alertify.success('🍩 Done 🎈');
		},
		function (err) {
			alertify.error('🍩 Error! 🎈');
		}
	);
}
