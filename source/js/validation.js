var validation = (function() {
	'use strict';

var init = function() {
	_setUpListners();
};
var check = true;
var _setUpListners = function() {
	$('input:text').on('keydown',function(){
		$(this).css('border', '1px solid #608e53');
		$(this).siblings('.icon_input').css({'border-right': '1px solid #608e53','color': '#608e53'});
		$(this).prev('.tooltip').remove();
		check = true;
	})
};
var validateForm = function(form) {
	var 
			elements = form.find('input:text'),
			valid = true;

	$.each(elements, function(index, val){
		
		var
				element = $(val),
				val = element.val();

		if((val.length === 0)) {
			console.log('проверить форму');
			element.css('border', '1px solid #e44845');
			element.siblings('.icon_input').css({'border-right': '1px solid #e44845',
				'color': '#e44845'});
			if(!(element.prev().is('.tooltip'))) {
				element.before("<div class='tooltip'><div class='tooltip__container'>"+element.attr('data-mes')+"</div></div>");
			}
			valid = false;
		}
	})
	check = false;
	return valid;
};

var clearForm = function(form) {
	
	var 
			elements = form.find('input:text');

	$.each(elements, function(index, val){
		
		var
				element = $(val),
				val = element.val();
		element.val('');
		element.css('border', 'none');
		element.siblings('.icon_input').css({'border-right': 'none',
				'color': '#c4cbcd'});
		$('.tooltip').remove();
	});
};
return {
	init: init,
	validateForm: validateForm,
	clearForm: clearForm
};

})();
validation.init();