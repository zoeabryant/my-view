$(document).ready(function(){

	var visual = $('.visual .name'); // change on marker function too
	var vspeed = 200;
	var eye = $('.eye');

	// Title fades out to show pretty (photoshopped) sky
	$('.title').delay(2000).fadeOut(1000);

	// Show building name on hover
	visual.mouseenter(function(){
		$(this).fadeTo(vspeed, 1);
	});

	// Show building info on click
	visual.click(function(){
		// toggling more information
		var name = $(this).parent().attr("data-name");
		var searchterm = $(this).parent().attr("data-search");
		
		showInfo(name, searchterm);
	});

	// Show building info on click
	$('.marker').click(function(){
		// toggling more information
		var name = $(this).parent().attr("data-name");
		var searchterm = $(this).parent().attr("data-search");
		
		showInfo(name, searchterm);
	});

	// Showing building name when hovering over marker
	$('.marker').mouseenter(function(){
		$(this).siblings('.name').fadeTo(vspeed, 1);
	});


	function showInfo(name, searchterm){
		$('.info').hide(); // hide irrelevant buildings
		$('#'+name).show(); // show building information
		$('.more').slideDown(); // show pretty box
		imageSearch.execute(searchterm); // google image search (see search.js)
	};

	// Fade building on mouseout
	visual.mouseout(function(){
		$(this).fadeTo(vspeed, 0);
	});

	// Toggle view eye
	eye.click(function() {
		if(visual.css('opacity') == 1){
			visual.fadeTo(vspeed, 0);
			eye.removeClass('on');
		}
		else{
			visual.fadeTo(vspeed, 1);
			eye.addClass('on');
		}
	});

	$('.more .toggle').click(function(){
		$('.more').slideUp();
		$('.info').hide();
	});




});

// Fade in the title when the user scrolls the page, just to remind them of my ego...
$( window ).scroll(function() {
	$('.title').fadeTo(1000, 1).delay(1500).fadeOut(1000);
});

// Reload the page on resize to reconfigure the marker - but show a nice UX loader spinner first
$( window ).resize(function(){
	$('#reloading').fadeTo(200, 1);
	setTimeout(function() {
		location.reload();
	}, 400);
});