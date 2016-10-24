var Blur = (function() {
	'use strict';
	var init = function() {
		_setUpListners();
	};

	var _setUpListners = function() {
		$(window).on('resize', blurFunc);
	};

	var blurFunc = function() {
		var 
				blurSection = $('.section-blur'),
				blur = $('.popup-container'),
				imgWidth = $('.blur__bg').width(),
				posTop = blurSection.offset().top-blur.offset().top,
				posLeft = blurSection.offset().left-blur.offset().left;

		if ($(window).width()<=1200) {
			$('.popup-container').css('background-image','url(../assets/img/bg-about1200.png)');
			$('.blur__bg img').attr('src','/assets/img/bg-about1200.png');
		}
		if ($(window).width()<=900) {
			$('.popup-container').css('background-image','url(../assets/img/bg-about768.png)');
			$('.blur__bg img').attr('src','/assets/img/bg-about768.png');
		}
		if ($(window).width()<=610){
			$('.popup-container').css('background-image','url(../assets/img/bg-about320.png)');
			$('.blur__bg img').attr('src','/assets/img/bg-about320.png');
		}
		if ($(window).width()>=1200){
			$('.popup-container').css('background-image','url(../assets/img/bg-about.png)');
			$('.blur__bg img').attr('src','/assets/img/bg-about.png');
		}		
		console.log(imgWidth);
			blur.css({
				'background-size' : imgWidth + 'px' + ' ' + 'auto',
				'background-position' : posLeft + 'px' + ' ' + posTop+ 'px'
			});
	}
	return {
		init: init,
		blurFunc: blurFunc
	};
})();

Blur.init();
$(window).on('load', function(){
	if (window.location.toString().indexOf('portfolio')>0){
	Blur.blurFunc();
	}
});

var myModule = (function() {
	'use strict';

//чтобы футер не наехал на сатьи
	var h_f=$('.footer-page').height();
	$('.section_blog').css('padding-bottom', h_f);


// слайдер
var slider = function(sliderCont){
	var counter = 0,
			counter_prev = 4,
			counter_next = 1,
			sliderCur=sliderCont,
			b_n=sliderCur.find('.controls_next'),
			b_p=sliderCur.find('.controls_prev'),
			flag=true;

// следующий слайд
	$(b_n).on('click', function(){
		if(flag==true){
			flag=false;
				var
						$this = $(this),
						slider = $this.closest('.slider'),
						imgs = slider.find('.slider__item_big'),
						imgs_prev = slider.find('.slider__item_prev'),
						imgs_next = slider.find('.slider__item_next'),
						descriptions = slider.find('.slider__description'),
						active = imgs.filter('.active'),
						active_prev = imgs_prev.filter('.active'),
						active_next = imgs_next.filter('.active'),
						active_description = descriptions.filter('.active'),
						next;

				// вычисляем номера слайдов
				if (counter != imgs.length-1){
					next = counter+1;
				} else{
					next = 0;
				}

				counter_prev = counter;

				if (next != imgs.length-1){
					counter_next = next+1;
				} else{
					counter_next = 0;
				}

				// анмация слайдов
				active_description.animate({
		        opacity: 0
		      	}, 500, function(){
		      		active_description.removeClass('active');
		      	})

				descriptions.eq(next).addClass('active');
				descriptions.eq(next).animate({
		        opacity: 1
		      	}, 500)

				active.animate({
		        opacity: 0
		      	}, 1000, function(){
		      		active.removeClass('active');
		      	})

				imgs.eq(next).addClass('active');
				imgs.eq(next).animate({
		        opacity: 1
		      	}, 1000)

				var promiseNext1 = new Promise(function(resolve){
					active_next.animate({
		        'top': '-100%'
		      	}, 1000, function(){
			      	active_next.css('top','100%');
			      	active_next.removeClass('active');
			      	resolve("ура");
		      	});
					})

				var promiseNext2 = new Promise(function(resolve){
					imgs_next.eq(counter_next).animate({
		        'top': '0%'
		      	}, 1000, function(){
		      		imgs_next.eq(counter_next).addClass('active');
		      		resolve('second');
		      	});
					})

				var promisePrev1 = new Promise(function(resolve){
					active_prev.animate({
		        'top': '100%'
		      	}, 1000, function(){
		      		active_prev.css('top','-100%');
		      		active_prev.removeClass('active');
		      		resolve('3');
		      	});
					})

				var promisePrev2 = new Promise(function(resolve){
					imgs_prev.eq(counter_prev).animate({
		        'top': '0%'
		      	}, 1000, function(){
		      		imgs_prev.eq(counter_prev).addClass('active');
		      		resolve('4');
		      	});
					})

			Promise.all([
			  promiseNext1,
			  promiseNext2,
			  promisePrev1,
			  promisePrev2
			]).then(function(result){
				console.log('all!!!');
				flag=true;
			})
			counter++;
			if(counter==imgs.length){
				counter = 0;
			}
		}
		return false;
	});

	//предыдущий слайд
	$(b_p).on('click', function(){
		console.log('click');
		if (flag==true){
			flag=false;
			var
					$this = $(this),
					slider = $this.closest('.slider'),
					imgs = slider.find('.slider__item_big'),
					imgs_prev = slider.find('.slider__item_prev'),
					imgs_next = slider.find('.slider__item_next'),
					descriptions = slider.find('.slider__description'),
					active = imgs.filter('.active'),
					active_prev = imgs_prev.filter('.active'),
					active_next = imgs_next.filter('.active'),
					active_description = descriptions.filter('.active'),
					prev;

			if (counter != 0){
				prev = counter-1;
			} else{
				prev = imgs.length-1;
			}

			counter_next = counter;

			if (prev != 0){
				counter_prev = prev-1;
			} else{
				counter_prev = imgs.length-1;
			}

			active_description.animate({
		        opacity: 0
		      	}, 500, function(){
		      		active_description.removeClass('active');
		      	})
				descriptions.eq(prev).addClass('active');
				descriptions.eq(prev).animate({
		        opacity: 1
		      	}, 500)

				active.animate({
		        opacity: 0
		      	}, 1000, function(){
		      		active.removeClass('active');
		      	})
				imgs.eq(prev).addClass('active');
				imgs.eq(prev).animate({
		        opacity: 1
		      	}, 1000)

			var promiseNext1 = new Promise(function(resolve){
						active_next.animate({
			        'top': '-100%'
			      	}, 1500, function(){
				      	active_next.css('top','100%');
				      	active_next.removeClass('active');
				      	resolve("ура");
			      	});
						})

					var promiseNext2 = new Promise(function(resolve){
						imgs_next.eq(counter_next).animate({
			        'top': '0%'
			      	}, 1500, function(){
			      		imgs_next.eq(counter_next).addClass('active');
			      		resolve('second');
			      	});
						})

					var promisePrev1 = new Promise(function(resolve){
						active_prev.animate({
			        'top': '100%'
			      	}, 1500, function(){
			      		active_prev.css('top','-100%');
			      		active_prev.removeClass('active');
			      		resolve('3');
			      	});
						})

					var promisePrev2 = new Promise(function(resolve){
						imgs_prev.eq(counter_prev).animate({
			        'top': '0%'
			      	}, 1500, function(){
			      		imgs_prev.eq(counter_prev).addClass('active');
			      		resolve('4');
			      	});
						})

				Promise.all([
				  promiseNext1,
				  promiseNext2,
				  promisePrev1,
				  promisePrev2
				]).then(function(result){
					console.log('all!!!');
					flag=true;
				})
			
			if(counter!=0){
				counter--;
			}
			else{
				counter = imgs.length-1;
			}
		}
		return false;
	});
};

// прелоадер
var imgs = [];
$.each($('*'), function() {
	var
			$this = $(this),
			bg = $this.css('background-image'),
			img = $this.is('img');

	if(bg != 'none'&& bg.indexOf("url")!=-1){
		var path = bg.replace('url("', '').replace('")', '');
		console.log(path);
		imgs.push(path);
	}

	if(img){
		var path = $this.attr('src');

		if (path) {
			imgs.push(path);
		}
	}

});

	var itemTotal=1;
	console.log(imgs.length);
	for(var i = 0; i<imgs.length; i++){
		var image =$('<img>', {
				src: imgs[i]});

		image.on("load", function(){
			setPr(imgs.length,itemTotal);
			itemTotal++;})
		image.on("error", function(){
			setPr(imgs.length,itemTotal);
			itemTotal++;
		});

}
// вычисляем, сколько процентов загружено
	function setPr(total, curent){

		var percent = Math.ceil(curent/total*100);
		//console.log(percent);
		if (percent>= 100){
			$('.preloader-container').fadeOut();
			$('body').css('overflow','visible');
		}
		$('.preloader__percent').text(percent + '%');
	}

//вычисляем высоту секции с картой
 var wh = 650;
 if($(window).height() > wh){
 	wh = $(window).height();
 }
 var h = $('.footer-page').height()+wh;
 $('.section_map').height(h);



 // нажатие на кнопку авторизации
 $('#login-button, .button_return').click(function(){
 	$('.popap-wrapper-container').toggleClass('flipp');
 });

// нажатие на гамбургер
 $('.ham').click(function(){
 	$('.main-nav').toggleClass('hide');
 	if($(".ham").hasClass("check")){
 			$('.el1').removeClass('el1_animate');
 			$('.el2').css('opacity','1');
 			$('.el3').removeClass('el3_animate');
 			$(".ham").removeClass("check");

 	} else{
 		$('.el1').addClass('el1_animate');
 		$('.el2').css('opacity','0');
 		$('.el3').addClass('el3_animate');
 		$(".ham").addClass("check");
 	}
 });

 // наведение на пункт меню в fullscreen
 $('.main-nav__link').mouseover(function(){
 	$(this).addClass('ac');
 });
 $('.main-nav__link').mouseout(function(){
 	if($(this).hasClass('ac')){
 		$(this).removeClass('ac');	
 	}
 })

 //Нажатие стрелки вниз в хедере
 $('.arrow-down').click(function(){
 	 var height=$(".header-page").height(); 
 	 $('body,html').animate({"scrollTop": height }, 800);
 });

$(window).scroll(function() {
// подсвечиваем заголовки статей

$.each($('article'), function() {
	var
			$this = $(this),
			id_article = $this.attr('id'),
			dist = $this.offset().top,
			h = $this.height();

		if($(window).scrollTop()>=dist-70 && $(window).scrollTop()<=dist+h){
			
			$.each($('.asie-blog__link'), function() {
	
				if($(this).attr('href')=='#'+id_article){
					$(this).addClass('aside-blog__item_active');
				}else{
					$(this).removeClass('aside-blog__item_active');
				}
		})
	}		
});
//фиксируем aside в блоге

	if(($('html').scrollTop()>=$('.header-page').height()) || ($('body').scrollTop()>=$('.header-page').height())){

		if (!($('.aside-blog').hasClass('fixed'))){
    		$('.aside-blog').addClass('fixed');
    	}
    }
  else{
    		if ($('.aside-blog').hasClass('fixed')){
	    		$('.aside-blog').removeClass('fixed');
	    	}
    	}

//анимация для skills
 if (window.location.toString().indexOf('about.htm')>0){ 
		var toskill = $('.my-skills__skills').offset().top;
		if ($('body').scrollTop()>=(toskill-$(window).height()+$('.my-skills__item').height()) && $('body').scrollTop()<toskill+$('.my-skills__skills').height()){
				
				$('.my-skills__item').each(function(i,elem){
					var percent = $(this).attr('data-percent');
					$(this).find('circle').attr('class', 'fill_anim'+percent);
				})
		 }
			if ($('body').scrollTop()<(toskill-$(window).height()+$('.my-skills__item').height()) || $('body').scrollTop()>=toskill+$('.my-skills__skills').height()){
				$('circle').attr('class', '');
			}
}
});

$(document).on('click', '.fixed',function(){
	if ($('.fixed').css('left')=='0px' && $(window).width()<=767){
    			$('.fixed').css('left','-50%');
    		}
   if ($('.fixed').css('left')!='0px' && $(window).width()<=767)
   {
    				$('.fixed').css('left','0');
    		}
});


$(window).resize(function(){
  if($(window).width()>767){
  	$('.fixed').css('left','0');
  }
  if($(window).width()<=767){
  	$('.fixed').css('left','-50%');
  }
});

$('.asie-blog__link').on('click', function(){
	event.preventDefault();
	var id  = $(this).attr('href'),
			top = $(id).offset().top;
	$('.asie-blog__link').removeClass('aside-blog__item_active');
	$(this).addClass('aside-blog__item_active');
	$('body,html').animate({scrollTop: top}, 1000);
});


// слйдер
slider($('.slider1'));
})();
