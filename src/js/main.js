/*======================== Object-fit support ========================*/
if ( ! Modernizr.objectfit ) {
	$('.image-wrapper').each(function () {
		var $container = $(this),
	    imgUrl = $container.find('img').prop('src');
	if (imgUrl) {
	  	$container
		    .css('backgroundImage', 'url(' + imgUrl + ')')
		    .addClass('compat-object-fit');
		}  
	});
}



/*======================== Какая то дичь ========================*/
(function() {
	var images = document.getElementsByTagName('img');
	for (var i = 0; i < images.length; i++) {
		if (images[i].getAttribute('src') == '/storage/app/media/page_b/blenda.jpg') {
			images[i].style.objectPosition = 'left';
		} else if (images[i].getAttribute('src') == '/storage/app/media/courses/kommercheskaya/kommerch2.jpg') {
			images[i].style.objectPosition = '30%';
		}
	}
})();



/*======================== Masonry grid init ========================*/
var mq = window.matchMedia( "(min-width: 768px)" );
msnryParams = {
	itemSelector: '.gallery-item',
	// gutter: 40,
	percentPosition: true,
	horizontalOrder: true,
	transitionDuration: '0.2s'
}

if (mq.matches && $('.msnry').length) {
	var elem = document.querySelector('.msnry');
	var msnry = new Masonry(elem, msnryParams);
}

window.onresize = function() {
	if (mq.matches && $('.msnry').length) {
		var elem = document.querySelector('.msnry');
		var msnry = new Masonry(elem, msnryParams);
	} else if (mq.matches && $('.msnry').length) {
		msnry.destroy();
	}
}


/*======================== Skrollr js init ========================*/
window.addEventListener('resize', function() {
	if (window.innerWidth > 992) {
		var skrllr = skrollr.init({forceHeight: false});
	} else {
		// var skrllr = skrollr.destroy();
	}
});
if (window.innerWidth > 992) {
	var skrllr = skrollr.init({forceHeight: false});
};



/*======================== Gift form popup ========================*/
// (function($) {
//     $(function() {
//   		if (!$.cookie('Gift')) {
// 	        function getWindow(){
//           		$('[data-remodal-id=gift-large]').remodal().open();
// 	        };
//         	setTimeout (getWindow, 60000);
//   		}
//       	$.cookie('Gift', true, {
//         	path: '/'
//       	});
//     });
// })(jQuery);



/*======================== Dynamic scroll ========================*/
window.onscroll = function() {
	var headerElem = document.querySelector('.header'); 
	if (window.pageYOffset > 500) {
		headerElem.classList.add('fixed');
	} else {
		headerElem.classList.remove('fixed');
		// headerElem.style.transform = 'translate3d(0, -100%, 0)';
	}
}



/*======================== Youtube video init ========================*/
var player;
$('.video-block__play-icon').on('click', function() {
	$('.video-block').addClass('init');
	$('#video')[0].src += "&autoplay=1";
});
function onYouTubePlayerAPIReady() {
	player = new YT.Player('video', {
		events: {
			'onReady': onPlayerReady
		}
	});
}
function onPlayerReady(event) {
	var playButton = document.querySelector('.video-block__play-icon');
	playButton.addEventListener('click', function() {
		player.playVideo();
	});
}
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



/*======================== Review read more button ========================*/
$('.review-item__text-block .text-block__descr').each(function() {
	var trimLength = 400;
	var trimMargin = 1.2; // don't trim just a couple of words
	if($(this).text().length > (trimLength * trimMargin)) {
		var text = $(this).text();
		var trimPoint = $(this).text().indexOf(" ", trimLength);
		var newContent = text.substring(0, trimPoint)+'<span class="read-more">'+text.substring(trimPoint)+'</span><span class="review__read-more">... <span>читать дальше</span></span>';
		$(this).html(newContent);
	}
});
$('.review__read-more span').click(function() {
	var para = $(this).closest('p');
	var initialHeight = $(this).closest('p').innerHeight();
	para.find('.read-more').show();
	para.find('.review__read-more').hide();
	var newHeight = para.innerHeight();
	para.css('max-height', initialHeight+'px');
	para.animate({ maxHeight: newHeight }, 50, function(){
  		para.css('max-height', 'none');
	});
	setTimeout(function() {
		var reviewsHeight = $('#reviews').innerHeight();
		var paginationOffset = reviewsHeight + 50;
		document.querySelector('.pages-pagination').style = 'top:' + paginationOffset + 'px';
	}, 60);
});



/*======================== Custom select ========================*/
$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});



/*======================== Tags cloud ========================*/
var tagsSelect = $('.tags-cloud__select-input');
var selectItems = $('.tags-cloud__select-items');

$('.tags-cloud__select-input').on('click', function() {
	$(this).toggleClass('opened');
	selectItems.toggleClass('opened');
});

// Tags appear
var tagItems = document.querySelectorAll('.item__checkbox');
var tagsContainer = document.querySelector('.tags');
var tagElems = document.querySelectorAll('.tags-cloud__tag');

function tagsCloud() {
	for (var i = 0; i <= tagItems.length-1; i++) {
		tagItems[i].onchange = function(e) {
			if (this.checked) {
				for (var i = 0; i < tagElems.length; i++) {
					if (tagElems[i].getAttribute('data-id') == this.getAttribute('id')) {
						tagElems[i].style.display = 'block';
					}
				}
			} else {
				for (var i = 0; i < tagElems.length; i++) {
					if (tagElems[i].getAttribute('data-id') == this.getAttribute('id')) {
						tagElems[i].style.display = 'none';
					}
				}
			}
		}
	}
};
tagsCloud();

$('.tags-cloud__tag').on('click', function() {
	for (var i = 0; i < tagItems.length; i++) {
		if (tagItems[i].getAttribute('id') == this.getAttribute('data-id') && tagItems[i].checked) {
			this.style.display = 'none';
			tagItems[i].checked = false;
		}
	}
});

$('.tags-cloud__tag.blog').on('click', function() {
	var $form = $(this).closest('form');
	$form.request('onFilter', {
		update: { 'blog/posts': '#posts' }
	});
});

$('.tags-cloud__tag.news').on('click', function() {
	var $form = $(this).closest('form');
	$form.request('onFilter', {
		update: { 'news/posts': '#posts' }
	});
});



/*======================== Hack for page pagination ========================*/
// var reviewsHeight = $('#reviews').innerHeight();
// console.log(reviewsHeight);

// function reviewsHeight() {
// 	var reviewsHeight = $('#reviews').innerHeight();
// 	console.log(reviewsHeight);
// };

// function dev() {
// 	alert('Hello');
// }



/*======================== Posts filtering ========================*/
// By category
(function($) {
	$('#postsCategoryFilter').on('change', 'input', function() {
		var $form = $(this).closest('form');
		$form.request();
	});
})(jQuery);

// By year
(function($) {
	$('#postsYearFilter').on('change', 'input, select', function() {
		var $form = $(this).closest('form');
		$form.request();
	});
})(jQuery);

// By course
(function($) {
	$('#reviewsFilter').on('change', 'input, select', function() {
		var $form = $(this).closest('form');
		$form.request();

		// update: {
		// 		'reviews/list': '#reviews',
		// 		'reviews/pagination': '.pages-pagination'
		// 	},
		// 	success: function() {
		// 		var reviewsHeight = document.getElementById('reviews').clientHeight;
		// 		console.log(reviewsHeight);
		// 	}

		// var timerId = setTimeout(function() {
		// 	var reviewsHeight = document.getElementById('reviews').clientHeight;
		// 	console.log(reviewsHeight);
		// }, 5000);
	});
})(jQuery);


if (document.getElementById('reviews')) {
	var reviewsHeight = document.getElementById('reviews').clientHeight + 50; 
	document.querySelector('.pages-pagination').style = 'top:' + reviewsHeight +'px';
};

if (document.getElementById('posts')) {
	if (document.documentElement.clientWidth < 992) {
		window.addEventListener('load', function() {
			var postsHeight = document.getElementById('posts').clientHeight;
			postsHeight = postsHeight + 70;
			document.querySelector('.pages-pagination').style = 'top:' + postsHeight + 'px';
		});	
	} else {
		var postsHeight = document.getElementById('posts').clientHeight;
		postsHeight = postsHeight + 70;
		document.querySelector('.pages-pagination').style = 'top:' + postsHeight + 'px';
	}
};

// var reviewsHeight = document.getElementById('reviews').clientHeight + 50;
// document.querySelector('.pages-pagination').style = 'top:' + reviewsHeight +'px';


(function($) {
	$('#pageFilter').on('change', 'input, select', function() {
		var $form = $(this).closest('form');
		$form.request();
		window.scrollTo(0, 500);
	});
})(jQuery);

// 7K^1S;~an0w}



/*======================== FAQ accordion ========================*/
$('.faq-item__question').on('click', function() {
	$(this).parent().toggleClass('opened');
	$(this).next().slideToggle(150);
});



/*======================== Attach input field file name ========================*/
$('input[type="file"]').change(function() {
	var value = $("input[type='file']").val();
	var fileName = value.replace(/^.*[\\/]/, '');
	$('.custom-input__text').text(fileName);
	// $('.file-input__wrapper').addClass('selected');
});



/*======================== Navigation open and close functions ========================*/
var adaptiveNavOpenElem = document.querySelector('.nav-icon.adaptive');
var desktopNavOpenElem = document.querySelector('.nav-icon.desktop');
var adaptiveNavCloseElem = document.querySelector('.nav__close.adaptive');
var desktopNavCloseElem = document.querySelector('.nav__close--desktop');
var bodyElem = document.querySelector('body');
var navElem = document.querySelector('.nav');
var desktopNavElem = document.querySelector('.nav__nav-hidden.desktop');
var overlayElem = document.querySelector('.overlay');

function menuOpen(elem, body) {
	elem.classList.add('opened');
	body.classList.add('no-scroll');
	if (window.innerWidth > 768) {
		overlayElem.classList.add('opened');
	}
}

function menuClose(elem, body) {
	elem.classList.remove('opened');
	body.classList.remove('no-scroll');
	if (window.innerWidth > 768) {
		overlayElem.classList.remove('opened');
	}
}

adaptiveNavOpenElem.onclick = function() {
	menuOpen(navElem, bodyElem);
}

adaptiveNavCloseElem.onclick = function() {
	menuClose(navElem, bodyElem);
}

desktopNavOpenElem.onclick = function() {
	menuOpen(desktopNavElem, bodyElem);
}

desktopNavCloseElem.onclick = function() {
	menuClose(desktopNavElem, bodyElem);
}

overlayElem.onclick = function() {
	menuClose(desktopNavElem, bodyElem);
}

if (window.innerWidth < 992) {
	$('.nav-visible__item.dropdown-link').on('click', function(e) {
		e.preventDefault();
		$(this).next().slideToggle(300);
	});
};


/*======================== Search form open and close functions ========================*/
var searchIcon = document.querySelector('.nav__search');
var searchCloseIcon = document.querySelector('.nav__close.search');
var searchBlock = document.querySelector('.search-block');

searchIcon.onclick = function() {
	searchBlock.classList.add('opened');
	bodyElem.classList.add('no-scroll');
	$('.form.search .form-fieldset__input').focus();
}

searchCloseIcon.onclick = function() {
	searchBlock.classList.remove('opened');
	bodyElem.classList.remove('no-scroll');
}



/*======================== Lightcase init ========================*/
$('a[data-rel="lightcase:slider:slideshow"]').lightcase({
	slideshowAutoStart: false,
	shrinkFactor: 1,
	maxWidth: 1100,
	maxHeight: 700,
	forceWidth: true
	// forceHeight: true
});



/*======================== Shares count ========================*/
// setTimeout(function() {
// 	// $('.social-likes').on('ready.social-likes', function(event, number) {
// 	// 	document.querySelector('.shares_count').innerHTML = number;
// 	// });
// 	var vk_counts = $('.social-likes__icon_vkontakte').text();
// 	var fb_counts = $('.social-likes__icon_facebook').text();
// 	var number = vk_counts + fb_counts;
// 	document.querySelector('.shares_count').innerHTML = number;
// 	console.log(number);
// }, 4000);


/*======================== Image lazy load ========================*/
$(function () {
    var images = $('.gallery-item');
    var image = $('.gallery-item img');
    if (images.length) {
    	for (var i = 0; i <= 3; i++) {
			image[i].src = image[i].getAttribute('data-src');
			images[i].style.display = 'block';
			var elem = document.querySelector('.msnry');
			var msnry = new Masonry(elem, msnryParams);
		};
    };
    $('#loadMore').on('click', function(e) {
    	e.preventDefault();

    	if (images.length > 4) {
    		for (var i = 4; i <= images.length-1; i++) {
	    		image[i].src = image[i].getAttribute('data-src');
	    		images[i].style.display = 'block';
	    		var elem = document.querySelector('.msnry');
				var msnry = new Masonry(elem, msnryParams);
	    	}
	    	$('#loadMore').fadeOut(100);
    	}
    });
});



/*======================== Put name from localStorage to form input ========================*/
// Courses forms
$(document).on('opening', '[data-remodal-id=zapis-stoke-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=zapis-stoke-gift]').children('form').find('input[name="name"]').val(name);
});
$(document).on('opening', '[data-remodal-id=zapis-cta-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=zapis-cta-gift]').children('form').find('input[name="name"]').val(name);
});
$(document).on('opening', '[data-remodal-id=zapis-inline-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=zapis-inline-gift]').children('form').find('input[name="name"]').val(name);
});
$(document).on('opening', '[data-remodal-id=zapis-banner-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=zapis-banner-gift]').children('form').find('input[name="name"]').val(name);
});
// Teachers forms
$(document).on('opening', '[data-remodal-id=zapis-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=zapis-gift]').children('form').find('input[name="name"]').val(name);
});
$(document).on('opening', '[data-remodal-id=cta-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=cta-gift]').children('form').find('input[name="name"]').val(name);
});
// Courses consultation form
$(document).on('opening', '[data-remodal-id=podobrat-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=podobrat-gift]').children('form').find('input[name="name"]').val(name);
});
// About cta form
$(document).on('opening', '[data-remodal-id=about-cta-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=about-cta-gift]').children('form').find('input[name="name"]').val(name);
});
// FAQ form
$(document).on('opening', '[data-remodal-id=faq-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=faq-gift]').children('form').find('input[name="name"]').val(name);
});
// Contacts form
$(document).on('opening', '[data-remodal-id=contacts-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=contacts-gift]').children('form').find('input[name="name"]').val(name);
});
// Reviews form
$(document).on('opening', '[data-remodal-id=reviews-gift]', function () {
	var name = localStorage.getItem('name');
	$('[data-remodal-id=reviews-gift]').children('form').find('input[name="name"]').val(name);
});



/*======================== Put URL to SessionStorage ========================*/
$(document).ready(function () {
	var URL = window.location.href;
	// console.log(URL);
	if (!sessionStorage.getItem('URL')) {
		sessionStorage.setItem('URL', URL);
	}
});



/*======================== Put URL to forms inputs ========================*/
// function setUrl() {
$(document).ready(function () {
	var urlFields = document.getElementsByTagName('input');
	var sessionUrl = sessionStorage.getItem('URL');
	// console.log(sessionUrl);
	for (var i = 0; i < urlFields.length; i++) {
		if (urlFields[i].matches('input[name="url"]')) {
			if (sessionUrl !== null) {
				urlFields[i].value = sessionUrl;	
			} else {
				urlFields[i].value = window.location.href;
			}
		};
	};
// };
// setUrl();
});



/*======================== Scroll top button ========================*/
(function() {
	function scrollUpBtn() {
		if (window.pageYOffset > 700) {
			document.querySelector('.scrollup').classList.add('scrollup--visible');
		} else {
			document.querySelector('.scrollup').classList.remove('scrollup--visible');
		}
	};
	addEventListener('scroll', scrollUpBtn);

	document.querySelector('.scrollup').onclick = function(e) {
		e.preventDefault();
		var scrollDuration = 300,
        	scrollStep = -window.scrollY / (scrollDuration / 15),
        	scrollInterval = setInterval(function() {
		        if ( window.scrollY != 0 ) {
		            window.scrollBy( 0, scrollStep );
		        }
		        else clearInterval(scrollInterval); 
	    	},15);
	};
})();


/*======================== 404 special title ========================*/
// if (window.location.pathname = '/404') {
// 	document.title = 'Ошибка 404 - данная страница не найдена';
// }



/*======================== RSS Blog popup ========================*/
if (document.querySelector('.rss-popup-overlay')) {
	if (!sessionStorage.getItem('RssBlog')) {
		var RssPopupOverlay = document.querySelector('.rss-popup-overlay'),
			RssPopup = document.querySelector('.rss-popup');

		if (window.innerWidth < 768) {
			setTimeout(function() {
				RssPopupOverlay.classList.add('rss-popup-overlay--active');
				RssPopup.classList.add('rss-popup--active');
			}, 5000);
			RssPopupOverlay.addEventListener('click', function(e) {
				this.classList.remove('rss-popup-overlay--active');
				RssPopup.classList.remove('rss-popup--active');
			});
		} else {
			setTimeout(function() {
				RssPopup.classList.add('rss-popup--active');
			}, 5000);
		};

		RssPopup.querySelector('.cancel').addEventListener('click', function(e) {
			e.preventDefault();
			RssPopupOverlay.classList.remove('rss-popup-overlay--active');
			RssPopup.classList.remove('rss-popup--active');
		});

		sessionStorage.setItem('RssBlog', true);	
	};
};
