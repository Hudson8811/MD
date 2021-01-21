$(document).ready(function () {
	$('#fullpage').fullpage({
		licenseKey: '930B3D8E-64114A48-BE58EB40-E2698A87',
		scrollingSpeed: 600,
		scrollHorizontally: false,
		controlArrows: false,
		loopHorizontal: false,
		//scrollOverflow: false,
		bigSectionsDestination: top,
		//normalScrollElements: '.process__right',
		//normalScrollElements: '.contacts',
		keyboardScrolling: true,
		responsiveWidth: 1260,
		afterResponsive: function(isResponsive){
			//console.log(isResponsive);
		},
		onLeave: function( origin, destination, direction){
			if ($(window).width() > 1260){
				if(destination.index == 1|| destination.index == 3 || destination.index == 5){
					$('body, .header').addClass('dark');
				} else {
					$('body, .header').removeClass('dark');
				}
			}
			$('.js-top-menu li').removeClass('active');
			$('.js-top-menu a[data-index="'+destination.index+'"]').parent().addClass('active');

			if ($(window).width() > 1260){
				if(destination.index == 0 || destination.index == 1 || destination.index == 2 || destination.index == 4 || destination.index == 5){
					fullpage_toggle(true);
				}

				if(destination.index == 3){
					fullpage_toggle(false);
					if ($('.process__dot.active').is(':first-child')){
						fullpage_toggle(true,'up');
					}
					if ($('.process__dot.active').is(':last-child')){
						fullpage_toggle(true,'down');
					}
				}
				/*
				if(destination.index == 4){
					fullpage_toggle(false);
					if ($('.portfolio__menu li:first-child a.active').length > 0){
						fullpage_toggle(true,'up');
					}
					if ($('.portfolio__menu li:last-child a.active').length > 0){
						fullpage_toggle(true,'down');
					}
				}*/
			} else {
				fullpage_toggle(true);
			}


			if(destination.index == 1 && origin.index == 0 ){
				$('.to-top').addClass('active');
			}
			if(destination.index == 0 && origin.index == 1 ){
				$('.to-top').removeClass('active');
			}
		}
	});

	$('.to-top').on('click', function (e) {
		e.preventDefault();
		$('.to-top').removeClass('active');
		$.fn.fullpage.moveTo(1);
	});

	$(".js-custom-select").select2({
		placeholder: "Интересующая услуга",
		minimumResultsForSearch: 99
	});

	var	wheel = 0;
	var	newDate = new Date();
	var	oldDate = new Date();
	$('.process').on('mousewheel', function(event) {
		if ($(window).width() > 1260) {
			newDate = new Date();
			var scrollAllowed = true;


			if( wheel < 10 && (newDate.getTime()-oldDate.getTime()) < 100 ) {
				wheel++;
			}
			else {
				if( (newDate.getTime()-oldDate.getTime()) > 100 ) {
					wheel = 0;
				}
				else {
					scrollAllowed = false;
				}
			}

		
			oldDate = new Date();
			if( scrollAllowed ) {
				if (event.deltaY > 0) {
					$('.process__control-prev').trigger('click');
				} else {
					$('.process__control-next').trigger('click');
				}
			}
		}
	});
/*
	$('.portfolio').on('mousewheel', function(event) {
		if (event.deltaY > 0){
			$('.js-portfolio-link.active').parent().prev().find('a').trigger('click');
		} else {
			$('.js-portfolio-link.active').parent().next().find('a').trigger('click');
		}
	});*/


	function fullpage_toggle(toggle, direction) {
		$.fn.fullpage.setAllowScrolling(toggle, direction);
		$.fn.fullpage.setKeyboardScrolling(toggle, direction);
	}


	$('.js-page-link').on('click',function (){
		event.preventDefault();
		$('.burger').removeClass('oppenned');
		if (!$('body').hasClass('dark')){
			$('.header').removeClass('dark');
		}
		event.stopPropagation();
		var index = parseInt($(this).data('index'));
		$.fn.fullpage.moveTo(index+1);
		$('.js-top-menu li').removeClass('active');
		$('.js-top-menu a[data-index="'+index+'"]').parent().addClass('active');
	});

	$('.home__tabs a').on('click',function (){
		event.preventDefault();
		if (!$(this).parent().hasClass('active')){
			$('.home__tabs li').removeClass('active');
			$(this).parent().addClass('active');

			var index = $(this).parent().index();
			$('.home__tab.active').slideUp(function (){
				$(this).removeClass('active');
			}).animate(
				{ opacity: 0 },
				{ queue: false, duration: 'slow' }
			);
			$('.home__tab').eq(index).slideDown(function (){
				$(this).addClass('active');
			}).animate(
				{ opacity: 1 },
				{ queue: false, duration: 'slow' }
			);

			var image = $(this).data('image');
			$('.home__image').animate({opacity: "0"},200,function (){
				$('.home__image').css('background-image','url('+image+')').animate({opacity: "1"})
			});
			if ($(window).width() < 1261){
				setTimeout(function (){
					recalcHeaderColors()
				},600)
			}
		}
	});



	$(document).delegate('.burger', 'click', function(event){
		$(this).addClass('oppenned');
		$('.header').addClass('dark');
		event.stopPropagation();
	})

	$(document).delegate('.cls', 'click', function(event){
		$('.burger').removeClass('oppenned');
		if (!$('body').hasClass('dark')){
			$('.header').removeClass('dark');
		}
		event.stopPropagation();
	});




	$('.service__item').on('click',function (){
		event.preventDefault();
		if (!$(this).hasClass('active')){
			$('.service__item').removeClass('active');
			$(this).addClass('active');
		}
	});

	$('.js-portfolio-link').on('click',function (){
		event.preventDefault();
		if (!$(this).hasClass('active') && !$('.portfolio__menu').hasClass('locked')){
			$('.portfolio__menu').addClass('locked');
			setTimeout(function() {
				$('.portfolio__menu').removeClass('locked');
			}, 600);

			$('.js-portfolio-link').removeClass('active');
			$(this).addClass('active');
			var image = $(this).data('image');
			var link = $(this).data('link');
			$('.portfolio__image img').animate({opacity: "0"},200,function (){
				$('.portfolio__image img').attr('src',image).animate({opacity: "1"})
			})
			$('.portfolio__link a').attr('href',link);

			/*fullpage_toggle(false);
			setTimeout(function() {

				fullpage_toggle(false);
				if ($('.portfolio__menu li:first-child a.active').length > 0){
					fullpage_toggle(true,'up');
				}
				if ($('.portfolio__menu li:last-child a.active').length > 0){
					fullpage_toggle(true,'down');
				}
			}, 500);*/
		}
	});


	$('.process__dot').on('click',function (){
		event.preventDefault();
		if (!$(this).hasClass('active') && !$('.process__dots').hasClass('locked')){
			$('.process__dots').addClass('locked');
			setTimeout(function() {
				$('.process__dots').removeClass('locked');
			}, 600);



			$('.process__dot').removeClass('active subactive show').addClass('hide');
			$(this).addClass('active').removeClass('hide');
			$(this).prev().addClass('subactive').removeClass('hide').prev().addClass('show').removeClass('hide');
			$(this).next().addClass('subactive').removeClass('hide').next().addClass('show').removeClass('hide');
			var index = $(this).index();
			$('.process__block').finish();

			var next = true;

			if ($('.process__block.active').index() > index){
				next = false;
			}
			var oldClass = 'preNext';
			if (next){
				$('.process__block').eq(index).addClass('next');
				oldClass = 'preNext';
			} else{
				$('.process__block').eq(index).addClass('prev');
				oldClass = 'prePrev';
			}
			$('.process__block.active').addClass(oldClass).fadeOut(200).promise().done(function(){
				$('.process__block').removeClass('active preNext prePrev');
				$('.process__block').eq(index).fadeIn(300).addClass('active').removeClass('prev next');
			});

			var	count = $('.process__dot').length;
			var wind =  $(window).width();
			if (wind > 1600) {
				if (index === 0){
					$('.process__dots').css('transform','translateY(109px)');
				} else if (index === 1){
					$('.process__dots').css('transform','translateY(47px)');
				} else if (index === count - 2){
					$('.process__dots').css('transform','translateY(-47px)');
				} else if (index === count - 1){
					$('.process__dots').css('transform','translateY(-109px)');
				} else {
					$('.process__dots').css('transform','translateY(0)');
				}
			} else if (wind > 1260) {
				if (index === 0){
					$('.process__dots').css('transform','translateY(5.67vw)')
				} else if (index === 1){
					$('.process__dots').css('transform','translateY(2.447vw)')
				} else if (index === count - 2){
					$('.process__dots').css('transform','translateY(-2.447vw)')
				} else if (index === count - 1){
					$('.process__dots').css('transform','translateY(-5.67vw)')
				} else {
					$('.process__dots').css('transform','translateY(0)')
				}
			} else {
				if (index === 0){
					$('.process__dots').css('transform','translateY(3.6458vw)')
				} else if (index === 1){
					$('.process__dots').css('transform','translateY(-2.8vw)')
				} else {
					$('.process__dots').css('transform','translateY(-9.0vw)')
				}
			}
			if (wind > 1260) {
				fullpage_toggle(false);
				setTimeout(function() {
					if ($('.process__dot.active').is(':first-child')){
						fullpage_toggle(true,'up');
					}
					if ($('.process__dot.active').is(':last-child')){
						fullpage_toggle(true,'down');
					}
				}, 500);
			} else {
				fullpage_toggle(true);
			}

		}
	});

	$('.process__control-prev').on('click',function (){
		event.preventDefault();
		if (!$('.process__dot.active').is(':first-child')){
			$('.process__dot.active').prev().trigger('click');
		}
	});
	$('.process__control-next').on('click',function (){
		event.preventDefault();
		if (!$('.process__dot.active').is(':last-child')){
			$('.process__dot.active').next().trigger('click');
		}
	});


	if ($(window).width() < 769){
		$('.portfolio__mobile').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
		});
		$('.portfolio__mobile').on('init', function(event, slick) {
			currentSlide = slick.slickCurrentSlide() + 1;
			slidesCount = slick.slideCount;
			$('.portfolio-control .slider-changer__current').text(('0' + currentSlide).slice(-2));
			$('.portfolio-control .slider-changer__total').text(('0' + slidesCount).slice(-2));
		});
		$('.portfolio__mobile').on('afterChange', function(event, slick, currentSlide) {
			currentSlide = slick.slickCurrentSlide() + 1;
			slidesCount = slick.slideCount;
			$('.portfolio-control .slider-changer__current').text(('0' + currentSlide).slice(-2));
			$('.portfolio-control .slider-changer__total').text(('0' + slidesCount).slice(-2));
		});
		$('.portfolio-control .slider-changer__prev').click(function(){
			$(".portfolio__mobile").slick('slickPrev');
		});
		$('.portfolio-control .slider-changer__next').click(function(){
			$(".portfolio__mobile").slick('slickNext');
		});



		$('.advantage__flex').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
		});
		$('.advantage__flex').on('init', function(event, slick) {
			currentSlide = slick.slickCurrentSlide() + 1;
			slidesCount = slick.slideCount;
			$('.advantage-control .slider-changer__current').text(('0' + currentSlide).slice(-2));
			$('.advantage-control .slider-changer__total').text(('0' + slidesCount).slice(-2));
		});
		$('.advantage__flex').on('afterChange', function(event, slick, currentSlide) {
			currentSlide = slick.slickCurrentSlide() + 1;
			slidesCount = slick.slideCount;
			$('.advantage-control .slider-changer__current').text(('0' + currentSlide).slice(-2));
			$('.advantage-control .slider-changer__total').text(('0' + slidesCount).slice(-2));
		});
		$('.advantage-control .slider-changer__prev').click(function(){
			$(".advantage__flex").slick('slickPrev');
		});
		$('.advantage-control .slider-changer__next').click(function(){
			$(".advantage__flex").slick('slickNext');
		});



		$('.process__right').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
		});
		$('.process__right').on('init', function(event, slick) {
			currentSlide = slick.slickCurrentSlide() + 1;
			slidesCount = slick.slideCount;
			$('.process-control .slider-changer__current').text(('0' + currentSlide).slice(-2));
			$('.process-control .slider-changer__total').text(('0' + slidesCount).slice(-2));
		});
		$('.process__right').on('afterChange', function(event, slick, currentSlide) {
			currentSlide = slick.slickCurrentSlide() + 1;
			slidesCount = slick.slideCount;
			$('.process-control .slider-changer__current').text(('0' + currentSlide).slice(-2));
			$('.process-control .slider-changer__total').text(('0' + slidesCount).slice(-2));
		});
		$('.process-control .slider-changer__prev').click(function(){
			$(".process__right").slick('slickPrev');
		});
		$('.process-control .slider-changer__next').click(function(){
			$(".process__right").slick('slickNext');
		});
	}


	var target = $('.section.dark');
	darks = [];
	whites = [];
	offset = 50;
	recalcHeaderColors()

	function recalcHeaderColors(){
		darks = [];
		whites = [];
		target.each(function () {
			darks.push($(this).offset().top - offset);
			whites.push($(this).offset().top+$(this).outerHeight() - offset);
		});
	}
	setTimeout(function (){
		recalcHeaderColors()
	},1000)

	function refreshScroll(){
		if ($(window).width() < 1261){
			var winScrollTop = $(this).scrollTop();
			var dark = false;
			$.each(darks, function (index, value) {
				if (winScrollTop >= value && winScrollTop <= whites[index]){
					dark = true;
				}
			});
			if (dark) {
				$('.header').addClass('dark');
			} else {
				$('.header').removeClass('dark');
			}
		}
	}

	refreshScroll();
	$(window).scroll(refreshScroll);

});


function rotateImage (event)
{
	var x = event.clientX;
	var w = window.innerWidth;
	var y = event.clientY;
	var h = window.innerHeight;
	var midpoint = w / 2;
	var midpoint2 = h / 2;
	var posX = x - midpoint;
	var posY = y - midpoint2;
	var valX = (posX / midpoint) * 15;
	var valY = (posY / midpoint2) * -5;
	var image = document.getElementById("js-paralax");
	image.style.transform = "perspective(1200px) rotateX(" + valY + "deg) rotateY(" + valX + "deg)";
}

document.addEventListener("mousemove", function (event)
{
	rotateImage (event)
}, false);
