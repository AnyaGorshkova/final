var login = (function() {
	'use strict';

var init = function() {
	_setUpListners();
};

var _setUpListners = function() {
	$('.button_submit').on('click', _submitForm);
	$('.button_clear').on('click', _clearForm);
};
var _clearForm = function(ev){
	ev.preventDefault();
	var form = $(this).parent().parent().siblings('.login_form');
	validation.clearForm(form);
}
var _submitForm = function(ev){
	ev.preventDefault();
	var form = $(this).parent().parent().siblings('.login_form'),
			url = 'login.php',
			defObj = _ajaxForm(form, url);
}

var _ajaxForm = function (form, url){
	console.log(validation.validateForm(form));
	if (!validation.validateForm(form)) return false;
	console.log('всё хорошо');
	validation.clearForm(form);
}

return {
	init:init
};
})();
login.init();