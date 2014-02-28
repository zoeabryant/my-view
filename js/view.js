$(document).ready(function(){

	var visual = $('.visual .name');
	var vspeed = 200;
	var eye = $('.eye');

	// Title fades out to show pretty (photoshopped) sky
	// $('.title').delay(2000).fadeOut(1000);


// NAME SHOW - on area
	// Show building name on area hover
	visual.mouseenter(function(){
		$(this).fadeTo(vspeed, 1);
		fadeall();
	});

	// Show building info on area click
	visual.click(function(){
		var area = $(this);
		showInfo(area);
	});

// NAME SHOW - on marker
	// Showing building name on marker hover
	$('.marker').mouseenter(function(){
		$(this).siblings('.name').fadeTo(vspeed, 1);
		fadeall();
	});

	// Show building info on marker click
	$('.marker').click(function(){
		var area = $(this);
		showInfo(area);
	});

// NAME HIDE - all
	// Fade building on mouseout
	visual.mouseout(function(){
		$(this).fadeTo(vspeed, 0);
	});

	var fadeall = function fadeall(){
		setTimeout(function() {
			visual.fadeTo(vspeed, 0)
		}, 3000);
	}

// MORE INFORMATION TOGGLING
	// show more info box
	function showInfo(area){
		//figure out which building by data-name class
		var name = $(area).parent().attr("data-name");

		// run through buildings in buildings.json
		for (var i=0; i<buildings.length; i++){
			// find a match
			if (buildings[i].id == name) {
				// populate fields
				$('#buildingname').html(buildings[i].name);
				$('#buildinginfo').html(buildings[i].info);
				imageSearch.execute(buildings[i].searchterm); // google image search (see search.js)
			};
		}
		
		// once populated, show.
		$('.more').slideDown(); // show pretty box

		// fade out interface
		eye.fadeOut();
		$('title').fadeOut().hide();
		$('.visual').fadeOut();

		// make it so if you click outside of the div it hides
		$('#bg').click(function(){
			hideinfo();
		});

	};
	// hide more info box
	$('.more .toggle').click(function(){
		hideinfo();
	});

	var hideinfo = function hideinfo(){
		// fade in interface
		eye.fadeIn();
		$('title').show().fadeIn();
		$('.visual').fadeIn();

		$('.more').slideUp();
		$('.info').hide();

	};


// INFORMATION TOGGLING - View all
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

	// Fade in the title when the user scrolls the page, just to remind them of my ego...
	$( window ).scroll(function() {
		$('.title').fadeTo(1000, 1).delay(1500).fadeOut(1000);
	});

	// Reload the page on resize to reconfigure the marker - but show a nice UX loader spinner first
	$( window ).resize(function(){
		$('#reloading').fadeTo(200, 1);
		setTimeout(function() {
			location.reload(true);
		}, 400);
	});

});