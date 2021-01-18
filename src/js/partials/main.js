$(document).ready(function () {
	$('#fullpage').fullpage({
		licenseKey: '930B3D8E-64114A48-BE58EB40-E2698A87',
		autoScrolling:false,
		scrollingSpeed: 0,
		easingcss3: 'linear',
		scrollHorizontally: false,
		controlArrows: false,
		loopHorizontal: false,
		onSlideLeave: function( section, origin, destination, direction){
			if(destination.index == 3|| destination.index == 4 || destination.index == 5){
				$('body, .header').addClass('dark');
			} else {
				$('body, .header').removeClass('dark');
			}
		}
	});

	//$.fn.fullpage.setAllowScrolling(false);


	$('.js-page-link').on('click',function (){
		event.preventDefault();
		$('.burger').removeClass('oppenned');
		if (!$('body').hasClass('dark')){
			$('.header').removeClass('dark');
		}
		event.stopPropagation();
		var index = parseInt($(this).data('index'));
		$.fn.fullpage.moveTo(1, index);
		$('.js-top-menu li').removeClass('active');
		$('.js-top-menu a[data-index="'+index+'"]').parent().addClass('active');
	});



	$(document).delegate('.burger', 'click', function(event){
		$(this).addClass('oppenned');
		$('.header').addClass('dark');
		event.stopPropagation();
	})
	/*$(document).delegate('body', 'click', function(event) {
		$('.burger').removeClass('oppenned');
	})*/
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
		if (!$(this).hasClass('active')){
			$('.js-portfolio-link').removeClass('active');
			$(this).addClass('active');
			var image = $(this).data('image');
			var link = $(this).data('link');
			$('.portfolio__image img').animate({opacity: "0"},200,function (){
				$('.portfolio__image img').attr('src',image).animate({opacity: "1"})
			})
			$('.portfolio__link a').attr('href',link);
		}
	});


	$('.process__dot').on('click',function (){
		event.preventDefault();
		if (!$(this).hasClass('active')){
			$('.process__dot').removeClass('active subactive show').addClass('hide');
			$(this).addClass('active').removeClass('hide');
			$(this).prev().addClass('subactive').removeClass('hide').prev().addClass('show').removeClass('hide');
			$(this).next().addClass('subactive').removeClass('hide').next().addClass('show').removeClass('hide');
			var index = $(this).index();
			$('.process__block').finish();
			$('.process__block').fadeOut(200).promise().done(function(){
				$('.process__block').eq(index).fadeIn(200);
			});

			var wind =  $(window).width();
			if (wind > 1600) {
				if (index === 0){
					$('.process__dots').css('transform','translateY(-30px)')
				} else if (index === 1){
					$('.process__dots').css('transform','translateY(-153px)')
				} else {
					$('.process__dots').css('transform','translateY(-248px)')
				}
			} else if (wind > 1260) {
				if (index === 0){
					$('.process__dots').css('transform','translateY(-1.5625vw)')
				} else if (index === 1){
					$('.process__dots').css('transform','translateY(-7.96875vw)')
				} else {
					$('.process__dots').css('transform','translateY(-12.916vw)')
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

});
