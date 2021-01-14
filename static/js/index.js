let DATA;
let PUBLIC = false;
let TAGS = new Set();
const languages = {
	'3d': '3d.svg',
	abc: 'abc.svg',
	actionscript: 'actionscript.svg',
	adonis: 'adonis.svg',
	advpl_include: 'advpl_include.svg',
	advpl_prw: 'advpl_prw.svg',
	advpl_ptm: 'advpl_ptm.svg',
	advpl_tlpp: 'advpl_tlpp.svg',
	android: 'android.svg',
	'angular-component': 'angular-component.svg',
	'angular-directive': 'angular-directive.svg',
	'angular-guard': 'angular-guard.svg',
	'angular-pipe': 'angular-pipe.svg',
	'angular-resolver': 'angular-resolver.svg',
	'angular-service': 'angular-service.svg',
	angular: 'angular.svg',
	apiblueprint: 'apiblueprint.svg',
	apollo: 'apollo.svg',
	applescript: 'applescript.svg',
	appveyor: 'appveyor.svg',
	arduino: 'arduino.svg',
	asciidoc: 'asciidoc.svg',
	assembly: 'assembly.svg',
	audio: 'audio.svg',
	aurelia: 'aurelia.svg',
	authors: 'authors.svg',
	autohotkey: 'autohotkey.svg',
	autoit: 'autoit.svg',
	'azure-pipelines': 'azure-pipelines.svg',
	azure: 'azure.svg',
	babel: 'babel.svg',
	ballerina: 'ballerina.svg',
	bash: 'bash.svg',
	bazel: 'bazel.svg',
	bitbucket: 'bitbucket.svg',
	bithound: 'bithound.svg',
	blink_light: 'blink_light.svg',
	blink: 'blink.svg',
	bower: 'bower.svg',
	browserlist: 'browserlist.svg',
	bucklescript: 'bucklescript.svg',
	buck: 'buck.svg',
	buildkite: 'buildkite.svg',
	cabal: 'cabal.svg',
	cake: 'cake.svg',
	capacitor: 'capacitor.svg',
	certificate: 'certificate.svg',
	changelog: 'changelog.svg',
	circleci: 'circleci.svg',
	clojure: 'clojure.svg',
	cloudfoundry: 'cloudfoundry.svg',
	cmake: 'cmake.svg',
	coconut: 'coconut.svg',
	'code-climate': 'code-climate.svg',
	codecov: 'codecov.svg',
	codeowners: 'codeowners.svg',
	coffee: 'coffee.svg',
	coldfusion: 'coldfusion.svg',
	commitlint: 'commitlint.svg',
	conduct: 'conduct.svg',
	console: 'console.svg',
	contributing: 'contributing.svg',
	cpp: 'cpp.svg',
	credits: 'credits.svg',
	crystal: 'crystal.svg',
	csharp: 'csharp.svg',
	'css-map': 'css-map.svg',
	css: 'css.svg',
	c: 'c.svg',
	cucumber: 'cucumber.svg',
	cuda: 'cuda.svg',
	dart: 'dart.svg',
	database: 'database.svg',
	dhall: 'dhall.svg',
	diff: 'diff.svg',
	disc: 'disc.svg',
	django: 'django.svg',
	docker: 'docker.svg',
	document: 'document.svg',
	dotjs: 'dotjs.svg',
	drawio: 'drawio.svg',
	drone: 'drone.svg',
	d: 'd.svg',
	dune: 'dune.svg',
	edge: 'edge.svg',
	editorconfig: 'editorconfig.svg',
	ejs: 'ejs.svg',
	elixir: 'elixir.svg',
	elm: 'elm.svg',
	email: 'email.svg',
	erlang: 'erlang.svg',
	eslint: 'eslint.svg',
	exe: 'exe.svg',
	fastlane: 'fastlane.svg',
	favicon: 'favicon.svg',
	file: 'file.svg',
	firebase: 'firebase.svg',
	flash: 'flash.svg',
	flow: 'flow.svg',
	font: 'font.svg',
	forth: 'forth.svg',
	fortran: 'fortran.svg',
	foxpro: 'foxpro.svg',
	fsharp: 'fsharp.svg',
	fusebox: 'fusebox.svg',
	gatsby: 'gatsby.svg',
	gcp: 'gcp.svg',
	gemfile: 'gemfile.svg',
	gitlab: 'gitlab.svg',
	gitpod: 'gitpod.svg',
	git: 'git.svg',
	'godot-assets': 'godot-assets.svg',
	godot: 'godot.svg',
	go_gopher: 'go_gopher.svg',
	'go-mod': 'go-mod.svg',
	go: 'go.svg',
	gradle: 'gradle.svg',
	graphcool: 'graphcool.svg',
	graphql: 'graphql.svg',
	groovy: 'groovy.svg',
	grunt: 'grunt.svg',
	gulp: 'gulp.svg',
	hack: 'hack.svg',
	haml: 'haml.svg',
	handlebars: 'handlebars.svg',
	haskell: 'haskell.svg',
	haxe: 'haxe.svg',
	hcl_light: 'hcl_light.svg',
	hcl: 'hcl.svg',
	helm: 'helm.svg',
	heroku: 'heroku.svg',
	hpp: 'hpp.svg',
	h: 'h.svg',
	html: 'html.svg',
	http: 'http.svg',
	husky: 'husky.svg',
	i18n: 'i18n.svg',
	imba: 'imba.svg',
	ionic: 'ionic.svg',
	istanbul: 'istanbul.svg',
	'javascript-map': 'javascript-map.svg',
	javascript: 'javascript.svg',
	java: 'java.svg',
	jenkins: 'jenkins.svg',
	jest: 'jest.svg',
	jinja: 'jinja.svg',
	json: 'json.svg',
	julia: 'julia.svg',
	jupyter: 'jupyter.svg',
	karma: 'karma.svg',
	key: 'key.svg',
	kivy: 'kivy.svg',
	kl: 'kl.svg',
	kotlin: 'kotlin.svg',
	laravel: 'laravel.svg',
	less: 'less.svg',
	lib: 'lib.svg',
	liquid: 'liquid.svg',
	lisp: 'lisp.svg',
	livescript: 'livescript.svg',
	lock: 'lock.svg',
	log: 'log.svg',
	lua: 'lua.svg',
	makefile: 'makefile.svg',
	markdown: 'markdown.svg',
	markojs: 'markojs.svg',
	mathematica: 'mathematica.svg',
	matlab: 'matlab.svg',
	mdx: 'mdx.svg',
	merlin: 'merlin.svg',
	meson: 'meson.svg',
	mint: 'mint.svg',
	mjml: 'mjml.svg',
	mocha: 'mocha.svg',
	moonscript: 'moonscript.svg',
	mxml: 'mxml.svg',
	'nest-controller': 'nest-controller.svg',
	'nest-decorator': 'nest-decorator.svg',
	'nest-filter': 'nest-filter.svg',
	'nest-gateway': 'nest-gateway.svg',
	'nest-guard': 'nest-guard.svg',
	'nest-middleware': 'nest-middleware.svg',
	'nest-module': 'nest-module.svg',
	'nest-pipe': 'nest-pipe.svg',
	'nest-resolver': 'nest-resolver.svg',
	'nest-service': 'nest-service.svg',
	nest: 'nest.svg',
	netlify: 'netlify.svg',
	'ngrx-actions': 'ngrx-actions.svg',
	'ngrx-effects': 'ngrx-effects.svg',
	'ngrx-entity': 'ngrx-entity.svg',
	'ngrx-reducer': 'ngrx-reducer.svg',
	'ngrx-state': 'ngrx-state.svg',
	nim: 'nim.svg',
	nix: 'nix.svg',
	nodejs: 'nodejs.svg',
	nodemon: 'nodemon.svg',
	npm: 'npm.svg',
	nrwl: 'nrwl.svg',
	nunjucks: 'nunjucks.svg',
	nuxt: 'nuxt.svg',
	ocaml: 'ocaml.svg',
	opam: 'opam.svg',
	other: 'other.svg',
	pascal: 'pascal.svg',
	pawn: 'pawn.svg',
	percy: 'percy.svg',
	perl: 'perl.svg',
	php_elephant: 'php_elephant.svg',
	php: 'php.svg',
	postcss: 'postcss.svg',
	powerpoint: 'powerpoint.svg',
	powershell: 'powershell.svg',
	prettier: 'prettier.svg',
	prisma: 'prisma.svg',
	processing: 'processing.svg',
	prolog: 'prolog.svg',
	protractor: 'protractor.svg',
	pug: 'pug.svg',
	puppet: 'puppet.svg',
	purescript: 'purescript.svg',
	'python-misc': 'python-misc.svg',
	python: 'python.svg',
	qsharp: 'qsharp.svg',
	racket: 'racket.svg',
	raml: 'raml.svg',
	razor: 'razor.svg',
	react: 'react.svg',
	react_ts: 'react_ts.svg',
	readme: 'readme.svg',
	reason: 'reason.svg',
	red: 'red.svg',
	'redux-action': 'redux-action.svg',
	'redux-reducer': 'redux-reducer.svg',
	'redux-store': 'redux-store.svg',
	restql: 'restql.svg',
	riot: 'riot.svg',
	robot: 'robot.svg',
	rollup: 'rollup.svg',
	routing: 'routing.svg',
	r: 'r.svg',
	ruby: 'ruby.svg',
	rust: 'rust.svg',
	san: 'san.svg',
	sass: 'sass.svg',
	sbt: 'sbt.svg',
	scala: 'scala.svg',
	scheme: 'scheme.svg',
	'semantic-release': 'semantic-release.svg',
	sequelize: 'sequelize.svg',
	settings: 'settings.svg',
	shaderlab: 'shaderlab.svg',
	silverstripe: 'silverstripe.svg',
	sketch: 'sketch.svg',
	slim: 'slim.svg',
	smarty: 'smarty.svg',
	sml: 'sml.svg',
	snyk: 'snyk.svg',
	sql: 'sql.svg',
	solidity: 'solidity.svg',
	stencil: 'stencil.svg',
	storybook: 'storybook.svg',
	stylelint: 'stylelint.svg',
	stylus: 'stylus.svg',
	sublime: 'sublime.svg',
	svelte: 'svelte.svg',
	svg: 'svg.svg',
	swc: 'swc.svg',
	swift: 'swift.svg',
	table: 'table.svg',
	tailwindcss: 'tailwindcss.svg',
	terraform: 'terraform.svg',
	'test-js': 'test-js.svg',
	'test-jsx': 'test-jsx.svg',
	'test-ts': 'test-ts.svg',
	tex: 'tex.svg',
	tilt: 'tilt.svg',
	todo: 'todo.svg',
	travis: 'travis.svg',
	tune: 'tune.svg',
	twig: 'twig.svg',
	'typescript-def': 'typescript-def.svg',
	typescript: 'typescript.svg',
	uml: 'uml.svg',
	url: 'url.svg',
	vagrant: 'vagrant.svg',
	vala: 'vala.svg',
	velocity: 'velocity.svg',
	vercel: 'vercel.svg',
	verilog: 'verilog.svg',
	vfl: 'vfl.svg',
	video: 'video.svg',
	vim: 'vim.svg',
	virtual: 'virtual.svg',
	visualstudio: 'visualstudio.svg',
	vscode: 'vscode.svg',
	'vue-config': 'vue-config.svg',
	vue: 'vue.svg',
	'vuex-store': 'vuex-store.svg',
	wakatime: 'wakatime.svg',
	wallaby: 'wallaby.svg',
	watchman: 'watchman.svg',
	webassembly: 'webassembly.svg',
	webhint: 'webhint.svg',
	webpack: 'webpack.svg',
	wepy: 'wepy.svg',
	wolframlanguage: 'wolframlanguage.svg',
	word: 'word.svg',
	xaml: 'xaml.svg',
	xml: 'xml.svg',
	yaml: 'yaml.svg',
	yang: 'yang.svg',
	yarn: 'yarn.svg',
	zig: 'zig.svg',
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
		data: { q, public: PUBLIC },
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
		localStorage.setItem('logedOut', true);
		window.location.href = '/login';
	} else {
		alertify.error('🍩 Unknown Error 🎈');
	}
}

function getCodeTemplate(obj) {
	let tagsString = '';
	let favouriteString = '';

	obj.tags.forEach(el => {
		TAGS.add(el);
		tagsString += `<span class="badge badge-primary mr-1 mt-1">${el}</span>`;
	});
	let owner = obj.owner ? ` by <code>${obj.owner}</code><br>` : '';
	if (!obj.owner) {
		const favouriteClass = obj.favourite ? 'text-danger' : 'text-light-grey';
		const favouriteValue = +obj.favourite;
		favouriteString = `<div class="ml-auto">
			<i class="fi fi-heart ${favouriteClass}" data-value="${favouriteValue}"></i>
		</div>`;
	}
	let template = `
	<div class="card-code d-flex align-items-center p-3 my-3 cards-bg rounded box-shadow" data-id="${obj._id}">
		<img
			class="mr-3"
			src="/static/languages/${languages[obj.language] || languages.other}"
			alt="${obj.language}"
			width="48" height="48"/>
		<div class="lh-100">
			<h6 class="mb-1 lh-100">${obj.title}</h6>
			${owner}
			${tagsString}<br>
			<small>${obj.description}</small>
		</div>
		${favouriteString}
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
	let editAble = true;
	if (PUBLIC && codeItem.editAble == false) {
		editAble = false;
	}

	$('#code-modal .modal-body pre code').text(codeItem.code).html();
	$('#copyToClipboard').data('id', codeItem._id);
	$('#editSnippet').data('id', codeItem._id);
	$('#deleteSnippet').data('id', codeItem._id);

	$('pre code').removeClass();
	$('pre code').each(function (i, block) {
		hljs.highlightBlock(block);
	});

	$('#code-modal .modal-body form, #edit__cancel, #edit__save').hide();
	$('#code-modal .modal-body pre, #editSnippet, #deleteSnippet').show();
	if (!editAble) {
		$('#editSnippet, #deleteSnippet').hide();
	}
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

	$('#code-modal .modal-body pre, #editSnippet').hide();

	$('#edit__id').val(codeItem._id);
	$('#edit__title').val(codeItem.title);
	$('#edit__description').val(codeItem.description);
	$('#edit__public').prop('checked', codeItem.public);
	$('#edit__favourite').prop('checked', codeItem.favourite);
	$('#edit__code').val(codeItem.code);
	$('#edit__language').val(codeItem.language).trigger('change');
	$('#edit__tags').val(codeItem.tags).trigger('change');
	$('#code-modal .modal-body form, #edit__cancel, #edit__save').show();
}

function addSnippetHandler(e) {
	e.preventDefault();

	$('.modal-body pre, #editSnippet, #deleteSnippet').hide();

	$('#edit__id').val('');
	$('#edit__title').val('');
	$('#edit__description').val('');
	$('#edit__public').prop('checked', false);
	$('#edit__favourite').prop('checked', false);
	$('#edit__code').val('');
	$('#edit__language').val('').trigger('change');
	$('#edit__tags').val([]).trigger('change');
	$('#code-modal .modal-body form, #edit__cancel, #edit__save').show();

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

	let id = $('#edit__id').val();
	let title = $('#edit__title').val();
	let description = $('#edit__description').val();
	let public = $('#edit__public').prop('checked');
	let favourite = $('#edit__favourite').prop('checked');
	let code = $('#edit__code').val();
	let language = $('#edit__language').val();
	let tags = $('#edit__tags').val();

	upsert({ id, title, description, public, favourite, code, language, tags });
}

function upsert({ id, title, description, public, favourite, code, language, tags }) {
	$.ajax({
		type: 'POST',
		url: '/api/snippets',
		headers: {
			token: localStorage.getItem('token') || '',
		},
		data: JSON.stringify({ id, title, description, public, favourite, code, language, tags }),
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
	$('#profile__username').val(localStorage.getItem('username'));
	$('#old__password, #new__password').val('');
	$('#generated_password').text('');
	$('#profile-modal').modal('show');
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

function generatePasswordHandler(e) {
	e.preventDefault();
	let generatedPassword = passwordGenerator();
	$('#generated_password').text(generatedPassword);
	$('#new__password').val(generatedPassword);
	copyToClipboard(generatedPassword);
}

function profileSaveHandler(e) {
	e.preventDefault();

	// check if old pass is entered ?
	let oldPassword = $('#old__password').val();
	if (!oldPassword) {
		alertify.error('Please Enter Old Password');
		return;
	}

	// check if new pass in entered ?
	let newPassword = $('#new__password').val();
	if (!newPassword) {
		alertify.error('Please Enter New Password');
		return;
	}

	$.ajax({
		type: 'PATCH',
		url: '/api/profile',
		data: JSON.stringify({ oldPassword, newPassword }),
		headers: {
			token: localStorage.getItem('token') || '',
		},
		contentType: 'application/json',
		dataType: 'json',
		success: function (response) {
			alertify.success('Profile Updated! Please login again!');
			setTimeout(() => {
				localStorage.clear();
				window.location.href = '/login';
			}, 3000);
		},
		error: function (err) {
			alertify.error(err.responseJSON.message);
		},
	});
}

function private_public_handler(e) {
	e.preventDefault();
	PUBLIC = !PUBLIC;
	$(this).html(
		PUBLIC ? `<i class="fi fi-toggle-on"></i> Public Snippets` : `<i class="fi fi-toggle-off"></i> My Snippets`
	);
	getSnippetsData();
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
	$('#private_public').click(private_public_handler);
	$('#generate_password').click(generatePasswordHandler);
	$('#profile__save').click(profileSaveHandler);

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
		function () {},
		function (err) {}
	);
	alertify.success('🍩 Copied to Clipboard 🎈');
}

function passwordGenerator(length = 24) {
	let result = '';
	let characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-/.,><`;
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function favoriteToggle(e) {
	console.log(e);
}
