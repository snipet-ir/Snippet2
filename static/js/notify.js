let _;
function notify({ status, title }) {
	_ = new Notify({
		effect: 'slide',
		autoclose: true,
		status,
		title,
	});
}
