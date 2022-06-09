/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){
   // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // init sticky sidebar
  $(".sticky").Stickyfill();

  var stickySideBar = function(){
    var show = $(".author__urls-wrapper button").length === 0 ? $(window).width() > 1024 : !$(".author__urls-wrapper button").is(":visible");
    // console.log("has button: " + $(".author__urls-wrapper button").length === 0);
    // console.log("Window Width: " + windowWidth);
    // console.log("show: " + show);
    //old code was if($(window).width() > 1024)
    if (show) {
      // fix
      Stickyfill.rebuild();
      Stickyfill.init();
      $(".author__urls").show();
    } else {
      // unfix
      Stickyfill.stop();
      $(".author__urls").hide();
    }
  };

  stickySideBar();

  $(window).resize(function(){
    stickySideBar();
  });

  // Follow menu drop down

  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

});

/*
 * animation widget from here: https://github.com/silexlabs/Silex/issues/443
 */
$(function() {
    if(silex.scale === 1) {
	var OFFSET = $('.hero-section, [data-prevent-scale-y]').height() * (1 - silex.scale) / 2 // this is because of the hero section which is not resizeable
	var win = $(window)
	var size = {
		h: win.height()
		// , w: win.width()
	}
	var initial = {
		h: size.h / silex.scale
		// , w: size.w / silex.scale
	}
	var offset = {
		h: initial.h - size.h + OFFSET
		// , w: initial.w - size.w
	}
	// this function is used to apply an offset to the detection of the active boundaries of the viewport
	// this is required when the viewport width is smaller than the website (when Silex scales down the website)
	function getOffset(el) {
		var position = $(el).position()
		var localOffset = {
			h: offset.h + (position.top * (1-silex.scale))
			// , w: offset.w + (position.left * (1-silex.scale))
		}
		return {
			top: offset.h
			, bottom: -offset.h
			// , left: offset.w
			// , right: -offset.w
		}
	}
	function getDelay(el) {
		var $el = $(el);
		if($el.hasClass('delay100')) return 100;
		if($el.hasClass('delay200')) return 200;
		if($el.hasClass('delay300')) return 300;
		if($el.hasClass('delay400')) return 400;
		if($el.hasClass('delay500')) return 500;
		if($el.hasClass('delay600')) return 600;
		if($el.hasClass('delay700')) return 700;
		if($el.hasClass('delay800')) return 800;
		if($el.hasClass('delay900')) return 900;
		if($el.hasClass('delay1000')) return 1000;
		return 0;
	}
	function getDistance(el) {
		var $el = $(el);
		if($el.hasClass('distance0')) return '0px';
		if($el.hasClass('distance100')) return '100px';
		if($el.hasClass('distance200')) return '200px';
		if($el.hasClass('distance500')) return '500px';
		if($el.hasClass('distance1000')) return '1000px';
		return '100px';
	}
	function getScale(el) {
		var $el = $(el);
		if($el.hasClass('scale3_4')) return 3/4;
		if($el.hasClass('scale2_3')) return 2/3;
		if($el.hasClass('scale1_2')) return 1/2;
		if($el.hasClass('scale1_3')) return 1/3;
		if($el.hasClass('scale1_4')) return 1/4;
		return 1;
	}
	var sr = ScrollReveal({
		distance: '100px'
		, reset: false
	});
	$('.from-left').each(function() {
		sr.reveal(this, { origin:  'left', scale: getScale(this), delay: getDelay(this), distance: getDistance(this), viewOffset: getOffset(this)});
	})
	$('.from-right').each(function() {
		sr.reveal(this, { origin:  'right', scale: getScale(this), delay: getDelay(this), distance: getDistance(this), viewOffset: getOffset(this)});
	})
	$('.from-top').each(function() {
		sr.reveal(this, { origin:  'top', scale: getScale(this), delay: getDelay(this), distance: getDistance(this), viewOffset: getOffset(this)});
	})
	$('.from-bottom').each(function() {
		sr.reveal(this, { origin:  'bottom', scale: getScale(this), delay: getDelay(this), distance: getDistance(this), viewOffset: getOffset(this)});
	})
    }
    ////////////////////////////////////////
    // FIX the height of the website as https://unpkg.com/scrollreveal is messing with it
    function resize() {
        $('body').css('max-height', Math.round(window.innerHeight * silex.scale))
    }
    $(window).resize(resize)
    // setTimeout(function() { resize() }, 0)
    resize()
    ////////////////////////////////////////
})
