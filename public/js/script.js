/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";
	/* global google: false */
	/* global Event: false */
	
	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
	// Needed variables
	var $container=$('.portfolio-box, .blog-masonry');
	var $filter=$('.filter');

	try{
		$container.imagesLoaded( function(){
			$container.show();
			$container.isotope({
				filter:'*',
				layoutMode:'masonry',
				animationOptions:{
					duration:750,
					easing:'linear'
				}
			});
			reconstructIsotope();
		});
	} catch(err) {
	}

	winDow.bind('resize', function(){
		var selector = $filter.find('a.active').attr('data-filter');

		try {
			$container.isotope({ 
				filter	: selector,
				animationOptions: {
					duration: 750,
					easing	: 'linear',
					queue	: false,
				}
			});
		} catch(err) {
		}
		return false;
	});

	/*-------------------------------------------------*/
	/* =  preloader function
	/*-------------------------------------------------*/
	var body = $('body');
	body.addClass('active');

	winDow.load( function(){
		var mainDiv = $('#container'),
			preloader = $('.preloader');

			preloader.fadeOut(400, function(){
				mainDiv.delay(400).addClass('active');
				body.delay(400).css('background', '#eaeaea');
			});
	});

	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/
	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			animation: "fade",
			slideshowSpeed: 4000,
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  fullwidth carousell
	/*-------------------------------------------------*/
	try {
		var fullCarousell = $("#owl-demo");
		fullCarousell.owlCarousel({
			navigation : true,
			afterInit : function(elem){
				var that = this;
				that.owlControls.prependTo(elem);
			}
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  header height fix
	/*-------------------------------------------------*/
	var content = $('#content');
	content.imagesLoaded( function(){
		var bodyHeight = $(window).outerHeight(),
		containerHeight = $('.inner-content').outerHeight(),
		headerHeight = $('header');

		if( bodyHeight > containerHeight ) {
			headerHeight.css('min-height',bodyHeight);
		} else {
			headerHeight.css('min-height',containerHeight);	
		}
	});

	winDow.bind('resize', function(){
		var bodyHeight = $(window).outerHeight(),
		containerHeight = $('.inner-content').outerHeight(),
		headerHeight = $('header');

		if( bodyHeight > containerHeight ) {
			headerHeight.css('min-height',bodyHeight);
		} else {
			headerHeight.css('min-height',containerHeight);	
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	header hide and show
	/* ---------------------------------------------------------------------- */

	var elemhide = $('.hide-menu'),
		elemshow = $('.show-menu');

		elemhide.on('click', function(e){
			e.preventDefault();

			$('header').addClass('out-active');
			$('.header-foot').addClass('out-active');
			$('#content').addClass('full-width-added');
			setTimeout(function() {
				try {
					reconstructIsotope();
				} catch(err) {

				}
				try {
					fullCarousell.data('owlCarousel').reinit({
						navigation : true
					});
				} catch(err) {

				}
				window.dispatchEvent(new Event('resize'));
				elemshow.addClass('active');
				
			}, 300);
			
		});

		elemshow.on('click', function(e){
			e.preventDefault();

			$('header').removeClass('out-active');
			$('.header-foot').removeClass('out-active');
			$('#content').removeClass('full-width-added');
			elemshow.removeClass('active');
			setTimeout(function() {
				try {
					reconstructIsotope();
				} catch(err) {

				}
				try {
					fullCarousell.data('owlCarousel').reinit({
						navigation : true
					});
				} catch(err) {

				}
			}, 300);
			
		});

	/*-------------------------------------------------*/
	/* =  browser detect
	/*-------------------------------------------------*/
	try {
		$.browserSelector();
		// Adds window smooth scroll on chrome.
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		var ZoomImage = $('.zoom');
		ZoomImage.magnificPopup({
			type: 'image'
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Testimonial
	/*-------------------------------------------------*/
	try{
		var testimUl = $('.testimonial > ul');

		testimUl.quovolver({
			transitionSpeed:300,
			autoPlay:true
		});
	}catch(err){
	}

	/*-------------------------------------------------*/
	/* = skills animate
	/*-------------------------------------------------*/

	try {
		var animateElement = $(".meter > span");
		animateElement.each(function() {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate({
					width: $(this).data("origWidth")
				}, 1200);
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* = accordion active state
	/*-------------------------------------------------*/

	try {

		var	panelHead = $(".panel-heading a");

		panelHead.on('click', function(){
			var $this = $(this);
			setTimeout(function() {
				$this.parents('.panel-heading').addClass('active');
				$('.panel-heading a.collapsed').parents('.panel-heading').removeClass('active');
			}, 300);		
			
		});
		
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	menu responsive
	/* ---------------------------------------------------------------------- */
	var menuClick = $('a.elemadded'),
		navbarVertical = $('.menu-box');
		
	menuClick.on('click', function(e){
		e.preventDefault();

		if( navbarVertical.hasClass('active') ){
			navbarVertical.slideUp(300).removeClass('active');
		} else {
			navbarVertical.slideDown(300).addClass('active');
		}
	});

	winDow.bind('resize', function(){
		if ( winDow.width() > 1024 ) {
			navbarVertical.slideDown(300).removeClass('active');
		} else {
			navbarVertical.slideUp(300).removeClass('active');
		}
	});

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	$('#contact-form input, #contact-form textarea').keydown(function(e) {
		if (e.keyCode == 13) {
			submitContact.trigger('click');
		}
	});

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	/* ---------------------------------------------------------------------- */
	/*	Contact Map call function
	/* ---------------------------------------------------------------------- */

	try {
		mapcallFunction();
	} catch(err) {

	}

	var mapButton = $('.map-button'),
		streetButton = $('.street-view-button'),
		mapHolder = $('.map');

		mapButton.on('click', function(e){
			e.preventDefault();
			if ( !mapButton.hasClass('active') ) {
				mapButton.addClass('active');
				mapHolder.fadeIn(300, function(){
					setTimeout(function() {
						var map = $(".map").gmap3('get');
						google.maps.event.trigger(map, 'resize');
						mapcallFunction();
					}, 400);
				});
			}
		});

		streetButton.on('click', function(e){
			e.preventDefault();
			if ( mapButton.hasClass('active') ) {
				mapButton.removeClass('active');
				mapHolder.fadeOut(300);
			}
		});

});

/* ---------------------------------------------------------------------- */
/*	Isotop reconstruct function
/* ---------------------------------------------------------------------- */
function reconstructIsotope(){
	$('.portfolio-box').isotope({ 
		animationOptions: {
			duration: 200,
			easing	: 'linear',
			queue	: true,
		}
	});
}

/* ---------------------------------------------------------------------- */
/*	map street view mode function
/* ---------------------------------------------------------------------- */
function initialize() {
	var bryantPark = new google.maps.LatLng(37.869260, -122.254811); //Change a map street view cordinate here!
	var panoramaOptions = {
		position: bryantPark,
		pov: {
			heading: 165,
			pitch: 0
		},
		zoom: 1
	};
	var myPano = new google.maps.StreetViewPanorama(
		document.getElementById('map-canvas'),
		panoramaOptions);
	myPano.setVisible(true);
}

try {
	google.maps.event.addDomListener(window, 'load', initialize);
} catch(err) {

}


/* ---------------------------------------------------------------------- */
/*	Contact Map
/* ---------------------------------------------------------------------- */

function mapcallFunction() {
	var contact = {"lat":"37.869260", "lon":"-122.254811"}; //Change a map coordinate here!

	var mapContainer = $('.map');
	mapContainer.gmap3({
		action: 'addMarker',
		latLng: [contact.lat, contact.lon],
		map:{
			center: [contact.lat, contact.lon],
			zoom: 14
			},
		},
		{action: 'setOptions', args:[{scrollwheel:true}]}
	);
}

/* ---------------------------------------------------------------------- */
/*	reconstruct isotope function
/* ---------------------------------------------------------------------- */

function reconstructIsotope(){
	$('.portfolio-box, .blog-masonry').isotope({
		layoutMode:'masonry',
		animationOptions:{
			duration:750,
			easing:'linear'
		}
	});
}