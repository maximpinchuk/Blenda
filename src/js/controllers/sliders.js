// $('.review__descr').each(function() {
// 	var trimLength = 400;
// 	var trimMargin = 1.2; // don't trim just a couple of words
// 	if($(this).text().length > (trimLength * trimMargin)) {
// 		var text = $(this).text();
// 		var trimPoint = $(this).text().indexOf(" ", trimLength);
// 		var newContent = text.substring(0, trimPoint)+'<span class="read-more">'+text.substring(trimPoint)+'</span><span class="review__read-more">... <a href="#">читать дальше</a></span>';
// 		$(this).html(newContent);
// 	}
// });
// $('.review__read-more a').click(function(e) {
// 	e.preventDefault();
// 	var para = $(this).closest('p');
// 	var initialHeight = $(this).closest('p').innerHeight();
// 	para.find('.read-more').show();
// 	para.find('.review__read-more').hide();
// 	var newHeight = para.innerHeight();
// 	para.css('max-height', initialHeight+'px');
// 	para.animate({ maxHeight: newHeight }, 100, function(){
//   		para.css('max-height', 'none');
// 	});
// });





/*======================== Swiper init (mainpage banner) ========================*/
var swiper = new Swiper('.banner-slider', {
	simulateTouch: false,
	loop: true,
    nextButton: '.banner__swiper-button-next',
    prevButton: '.banner__swiper-button-prev',
    pagination: '.banner__swiper-pagination',
    paginationType: 'fraction',
    parallax: true,
    autoplay: 10000,
    speed: 600
});



/*======================== Swiper init (reviews) ========================*/
// Custom transition
var interleaveOffset = -0.3;
var interleaveEffect = {
	onProgress: function(swiper, progress) {  
    	for (var i = 0; i < swiper.slides.length; i++) {
			var slide = swiper.slides[i];
			var translate, innerTranslate;
			progress = slide.progress;

			if (progress > 0) {
				translate = progress * swiper.width;
				innerTranslate = translate * interleaveOffset;        
			} else {        
				innerTranslate = Math.abs( progress * swiper.width ) * interleaveOffset;
				translate = 0;
      		}
			slide.style.transform = 'translate3d(' + translate + 'px, 0, 0)';
			// slide.querySelectorAll('.slide-inner').style.transform = 'translate3d(' + innerTranslate + 'px, 0, 0)';
			$(slide).find('.slide-inner').css({
				transform: 'translate3d(' + innerTranslate + 'px,0,0)'
			});
		}
  	},
	onTouchStart: function(swiper) {
		for (var i = 0; i < swiper.slides.length; i++) {
	  		swiper.slides[i].style.transition = '';
		}
	},
	onSetTransition: function(swiper, speed) {
		for (var i = 0; i < swiper.slides.length; i++) {
			$(swiper.slides[i])
			.find('.slide-inner')
			.addBack()
			.css({ transition: speed + 'ms' });
		}
	}
};

var swiperOptions = {
	watchSlidesProgress: true,
	loop: true,
	speed: 600,
	simulateTouch: false
};
swiperOptions = $.extend(swiperOptions, interleaveEffect);

// var swiperReviewPhotoOptions = {
// 	watchSlidesProgress: true,
// 	loop: true,
// 	speed: 600,
// 	simulateTouch: false,
// 	nextButton: '.review-slider__swiper-button-next',
//     prevButton: '.review-slider__swiper-button-prev',
//     pagination: '.review-slider__swiper-pagination',
//     paginationType: 'fraction'
// }
// swiperReviewPhotoOptions = $.extend(swiperReviewPhotoOptions, interleaveEffect);

var reviewDescrSlider = new Swiper('.gallery-middle', {
	nextButton: '.review-slider__swiper-button-next',
    prevButton: '.review-slider__swiper-button-prev',
    pagination: '.review-slider__swiper-pagination',
    paginationType: 'fraction',
    // effect: 'fade',
    loop: true,
    simulateTouch: false
});
var reviewNextPhoto = new Swiper('.next-reviewer-photo-slider', swiperOptions);
var reviewActivePhoto = new Swiper('.reviewer-photo-slider', swiperOptions);

// Swiper controls
var ww = window.matchMedia( "(min-width: 768px)" );
if (ww.matches) {
	reviewDescrSlider.params.control = reviewActivePhoto;
	reviewDescrSlider.params.control = reviewNextPhoto;
	reviewNextPhoto.params.control = reviewActivePhoto;
} else {
	reviewDescrSlider.params.control = reviewActivePhoto;
	reviewActivePhoto.params.control = reviewDescrSlider;
}
window.onresize = function() {
	if (ww.matches) {
		reviewDescrSlider.params.control = reviewActivePhoto;
		reviewDescrSlider.params.control = reviewNextPhoto;
		reviewNextPhoto.params.control = reviewActivePhoto;
	} else {
		reviewDescrSlider.params.control = reviewActivePhoto;
		reviewNextPhoto.params.control = reviewActivePhoto;
	}
}



/*======================== Swiper init (Чему вы научитесь) ========================*/
var aboutSchoolSliderDescr = new Swiper('.learn-steps-slider', {
	nextButton: '.learn-steps__swiper-button-next',
    prevButton: '.learn-steps__swiper-button-prev',
    pagination: '.learn-steps__swiper-pagination',
    paginationType: 'fraction',
	loop: true
});
var aboutSchoolSliderImage = new Swiper('.learn-steps-image', {
	loop: true,
	watchSlidesProgress: true,
	speed: 600,
	onProgress: function(swiper, progress) {  
    	for (var i = 0; i < swiper.slides.length; i++) {
			var slide = swiper.slides[i];
			var translate, innerTranslate;
			progress = slide.progress;

			if (progress > 0) {
				translate = progress * swiper.width;
				innerTranslate = translate * interleaveOffset;        
			} else {        
				innerTranslate = Math.abs( progress * swiper.width ) * interleaveOffset;
				translate = 0;
      		}
			slide.style.transform = 'translate3d(' + translate + 'px, 0, 0)';
			// slide.querySelectorAll('.slide-inner').style.transform = 'translate3d(' + innerTranslate + 'px, 0, 0)';
			$(slide).find('.slide-inner-about').css({
				transform: 'translate3d(' + innerTranslate + 'px,0,0)'
			});
		}
  	},
	onTouchStart: function(swiper) {
		for (var i = 0; i < swiper.slides.length; i++) {
	  		swiper.slides[i].style.transition = '';
		}
	},
	onSetTransition: function(swiper, speed) {
		for (var i = 0; i < swiper.slides.length; i++) {
			$(swiper.slides[i])
			.find('.slide-inner-about')
			.addBack()
			.css({ transition: speed + 'ms' });
		}
	}
});

// Swiper controls
aboutSchoolSliderImage.params.control = aboutSchoolSliderDescr;
aboutSchoolSliderDescr.params.control = aboutSchoolSliderImage;



/*======================== Swiper init (Как проходят занятия в фотошколе) ========================*/
var classesSliderActive = new Swiper('.classes-slider-active-photo', {
	nextButton: '.classes-slider__swiper-button-next.active-photo',
    prevButton: '.classes-slider__swiper-button-prev.active-photo',
    pagination: '.classes-slider__swiper-pagination.active-photo',
    paginationType: 'fraction',
	loop: true,
	watchSlidesProgress: true,
	speed: 600,
	onProgress: function(swiper, progress) {  
    	for (var i = 0; i < swiper.slides.length; i++) {
			var slide = swiper.slides[i];
			var translate, innerTranslate;
			progress = slide.progress;

			if (progress > 0) {
				translate = progress * swiper.width;
				innerTranslate = translate * interleaveOffset;        
			} else {        
				innerTranslate = Math.abs( progress * swiper.width ) * interleaveOffset;
				translate = 0;
      		}
			slide.style.transform = 'translate3d(' + translate + 'px, 0, 0)';
			// slide.querySelectorAll('.slide-inner').style.transform = 'translate3d(' + innerTranslate + 'px, 0, 0)';
			$(slide).find('.slide-inner-active-photo').css({
				transform: 'translate3d(' + innerTranslate + 'px,0,0)'
			});
		}
  	},
	onTouchStart: function(swiper) {
		for (var i = 0; i < swiper.slides.length; i++) {
	  		swiper.slides[i].style.transition = '';
		}
	},
	onSetTransition: function(swiper, speed) {
		for (var i = 0; i < swiper.slides.length; i++) {
			$(swiper.slides[i])
			.find('.slide-inner-active-photo')
			.addBack()
			.css({ transition: speed + 'ms' });
		}
	}
});
var classesSliderNext = new Swiper('.classes-slider-next-photo', {
	nextButton: '.classes-slider__swiper-button-next.next-photo',
    prevButton: '.classes-slider__swiper-button-prev.next-photo',
    pagination: '.classes-slider__swiper-pagination.next-photo',
    paginationType: 'fraction',
	loop: true,
	watchSlidesProgress: true,
	speed: 600,
	onProgress: function(swiper, progress) {  
    	for (var i = 0; i < swiper.slides.length; i++) {
			var slide = swiper.slides[i];
			var translate, innerTranslate;
			progress = slide.progress;

			if (progress > 0) {
				translate = progress * swiper.width;
				innerTranslate = translate * interleaveOffset;        
			} else {        
				innerTranslate = Math.abs( progress * swiper.width ) * interleaveOffset;
				translate = 0;
      		}
			slide.style.transform = 'translate3d(' + translate + 'px, 0, 0)';
			// slide.querySelectorAll('.slide-inner').style.transform = 'translate3d(' + innerTranslate + 'px, 0, 0)';
			$(slide).find('.slide-inner-next-photo').css({
				transform: 'translate3d(' + innerTranslate + 'px,0,0)'
			});
		}
  	},
	onTouchStart: function(swiper) {
		for (var i = 0; i < swiper.slides.length; i++) {
	  		swiper.slides[i].style.transition = '';
		}
	},
	onSetTransition: function(swiper, speed) {
		for (var i = 0; i < swiper.slides.length; i++) {
			$(swiper.slides[i])
			.find('.slide-inner-next-photo')
			.addBack()
			.css({ transition: speed + 'ms' });
		}
	}
});

// Swiper controls
classesSliderActive.params.control = classesSliderNext;
classesSliderNext.params.control = classesSliderActive;



/*======================== Swiper init (Team) ========================*/
var teamSlider = new Swiper('.staff-slider', {
	nextButton: '.staff-slider__swiper-button-next',
    prevButton: '.staff-slider__swiper-button-prev',
    pagination: '.staff-slider__swiper-pagination',
    paginationType: 'fraction',
	loop: true,
	slidesPerView: 3,
	spaceBetween: 76,
	breakpoints: {
		480: {
			slidesPerView: 1,
			spaceBetween: 0
		},
		640: {
			slidesPerView: 2,
			spaceBetween: 30
		}
	}
});



/*======================== Swiper init (Gallery) ========================*/
var gallerySlider = new Swiper('.gallery-courses-slider', {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 'auto',
	centeredSlides: true,
	nextButton: '.gallery-courses-slider .gallery-slider__swiper-button-next',
    prevButton: '.gallery-courses-slider .gallery-slider__swiper-button-prev',
    pagination: '.gallery-courses-slider .gallery-slider__swiper-pagination',
    paginationType: 'fraction',
    slideToClickedSlide: true
});

var galleryCategorySliderWorks = new Swiper('.gallery-category-slider.works', {
	loop: true,
	slidesPerView: 'auto',
	simulateTouch: false
});

var galleryCategorySliderBackstage = new Swiper('.gallery-category-slider.backstage', {
	loop: true,
	slidesPerView: 'auto',
	simulateTouch: false
});

galleryCategorySliderWorks.params.control = gallerySlider;
galleryCategorySliderWorks.params.control = galleryCategorySliderBackstage;
gallerySlider.params.control = galleryCategorySliderWorks;



/*======================== Swiper init (Gallery Teachers) ========================*/
var galleryTeachersSlider = new Swiper('.gallery-teachers-slider', {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 'auto',
	centeredSlides: true,
	nextButton: '.gallery-teachers-slider .gallery-slider__swiper-button-next',
    prevButton: '.gallery-teachers-slider .gallery-slider__swiper-button-prev',
    pagination: '.gallery-teachers-slider .gallery-slider__swiper-pagination',
    paginationType: 'fraction',
    slideToClickedSlide: true
});



/*======================== Swiper init (Teachers on course page) ========================*/
var interleaveOffset = -0.3;
var interleaveEffectTeacher = {
	onProgress: function(swiper, progress) {  
    	for (var i = 0; i < swiper.slides.length; i++) {
			var slide = swiper.slides[i];
			var translate, innerTranslate;
			progress = slide.progress;

			if (progress > 0) {
				translate = progress * swiper.width;
				innerTranslate = translate * interleaveOffset;        
			} else {        
				innerTranslate = Math.abs( progress * swiper.width ) * interleaveOffset;
				translate = 0;
      		}
			slide.style.transform = 'translate3d(' + translate + 'px, 0, 0)';
			// slide.querySelectorAll('.slide-inner').style.transform = 'translate3d(' + innerTranslate + 'px, 0, 0)';
			$(slide).find('.teacher-slider-photo__img-wrapper').css({
				transform: 'translate3d(' + innerTranslate + 'px,0,0)'
			});
		}
  	},
	onTouchStart: function(swiper) {
		for (var i = 0; i < swiper.slides.length; i++) {
	  		swiper.slides[i].style.transition = '';
		}
	},
	onSetTransition: function(swiper, speed) {
		for (var i = 0; i < swiper.slides.length; i++) {
			$(swiper.slides[i])
			.find('.teacher-slider-photo__img-wrapper')
			.addBack()
			.css({ transition: speed + 'ms' });
		}
	}
};

var swiperTeacherOptions = {
	watchSlidesProgress: true,
	loop: true,
	speed: 600,
	nextButton: '.teacher-photo-slider__swiper-button-next',
    prevButton: '.teacher-photo-slider__swiper-button-prev',
    pagination: '.teacher-photo-slider__swiper-pagination',
    paginationType: 'fraction'
};
swiperOptions = $.extend(swiperTeacherOptions, interleaveEffectTeacher);

if ($('.teacher-slider-photo .swiper-slide').length > 1) {
	var teacherGalleryDescr = new Swiper('.teacher-slider-descr', {
		loop: true,
		speed: 600,
		nextButton: '.teacher-descr-slider__swiper-button-next',
	    prevButton: '.teacher-descr-slider__swiper-button-prev',
	    pagination: '.teacher-descr-slider__swiper-pagination',
	    paginationType: 'fraction',
	    spaceBetween: 10
	});
	var teacherGalleryPhoto = new Swiper('.teacher-slider-photo', swiperTeacherOptions);	
	teacherGalleryPhoto.params.control = teacherGalleryDescr;
	teacherGalleryDescr.params.control = teacherGalleryPhoto;
}



/*======================== Swiper init (Courses descr) ========================*/
var coursesDescrSlider = new Swiper('.course-descr-slider', {
	loop: true,
	nextButton: '.course-descr-slider__swiper-button-next',
    prevButton: '.course-descr-slider__swiper-button-prev',
    pagination: '.course-descr-slider__swiper-pagination',
    paginationType: 'fraction'
});

var courseDescrPhotoSlider = new Swiper('.course-descr-photo-slider', {
	loop: true,
	spaceBetween: 0,
	nextButton: '.course-descr-photo-slider__swiper-button-next',
    prevButton: '.course-descr-photo-slider__swiper-button-prev',
    pagination: '.course-descr-photo-slider__swiper-pagination',
    paginationType: 'fraction'
});

courseDescrPhotoSlider.params.control = coursesDescrSlider;
coursesDescrSlider.params.control = courseDescrPhotoSlider;