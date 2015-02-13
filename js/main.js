function lancer() { // Function which replace window.onload
	addEvent(window, "load", scroll);
	addEvent(window, "load", slide);
}
lancer();

// Function which allowed to load all functions at the end of page load
function addEvent(obj, event, fct) {
	if (obj.attachEvent) { // For IE
		obj.attachEvent("on" + event, fct);
	}
	else {
		obj.addEventListener(event, fct, true);
	}
}

///// Scroll /////
function scroll(){
	$(document).ready(function() {
		$('.scrollTo').click( function() { // Au clic sur un élément
			var page = $(this).attr('href'); // Page cible
			var speed = 1000; // Durée de l'animation (en ms)
			$('html, body').animate( { scrollTop: $(page).offset().top -60 }, speed ); // Go
			return false;
		});
	});
}
///// End Scroll /////

////////////////////// Slide //////////////////////
function slide(){
	var content = document.getElementById('content');
	var prev = document.getElementById('previous');
	var next = document.getElementById('next');
	var liTab = document.getElementById('dots').getElementsByTagName('li'); // Get the number of dots

	var movePx = 0, movePxInitial = movePx;
	var incremente = document.getElementById('slider').offsetWidth; // Width value of div#slider = 680
	
	var nbElement = content.getElementsByTagName('li').length; // Total number of videos
	var maxPx = Math.floor(nbElement / 2) * incremente; // 2 = Number of visible Element

	var enabled = "#fff";
	var disabled = "#aaa";

	// On arrows click
	prev.addEventListener('click', function(){
		if (movePx < movePxInitial) {
			movePx += incremente;
			slider();
		}
	});
	next.addEventListener('click', function(){
		if (movePx > -maxPx) {
			movePx -= incremente;
			slider();
		}
	});

	// Slide <li> and test arrows and dots to know what to do
	function slider(){
		content.style.marginLeft = movePx + "px";
		
		// Display arrow prev
		if (movePx < movePxInitial) { // Second, third and last slide
			prev.style.opacity = 1;
			prev.style.cursor = "pointer";
		}
		// Hide arrow prev and switch dots' background
		else { // First slide
			prev.style.opacity = 0;
			prev.style.cursor = "default";
			dots(enabled, disabled, disabled, disabled);
		}

		if (movePx == -incremente) { // Second slide
			dots(disabled, enabled, disabled, disabled);
		}
		else if (movePx == (2 * -incremente)) { // Third slide
			dots(disabled, disabled, enabled, disabled);
		}

		if (movePx > -maxPx) { // First and second slide
			next.style.opacity = 1;
			next.style.cursor = "pointer";
		}
		else { // Last slide
			next.style.opacity = 0;
			next.style.cursor = "default";
			if (liTab[3]) {
				dots(disabled, disabled, disabled, enabled);
			}
			else{
				dots(disabled, disabled, enabled);
			}
		}
	}

	// Change dots' color  in terms of slider();
	function dots(first, second, third, fourth){
		liTab[0].style.background = first;
		liTab[1].style.background = second;
		if (liTab[3]) {
			liTab[2].style.background = third;
			liTab[3].style.background = fourth;
		}
		else {
			liTab[2].style.background = third;
		}
	}

	// On dots click 
	liTab[0].addEventListener('click', function(){
		dotClick(0);
	});
	liTab[1].addEventListener('click', function(){
		dotClick(1);
	});
	liTab[2].addEventListener('click', function(){
		dotClick(2);
	});
	if (liTab[3]) {
		liTab[3].addEventListener('click', function(){
			dotClick(3);
		});
	}
	function dotClick(nb){
		switch(nb){
			case 0:
				movePx = movePxInitial;
				slider();
				dots(enabled, disabled, disabled, disabled);
			break;

			case 1:
				movePx = -incremente;
				slider();
				dots(disabled, enabled, disabled, disabled);
			break;

			case 2:
				movePx = -2 * incremente;
				slider();
				dots(disabled, disabled, enabled, disabled);
			break;

			case 3:
				movePx = -maxPx;
				slider();
				dots(disabled, disabled, disabled, enabled);
			break;
		}
	}
}
////////////////////// End Slide //////////////////////
///// End Slide /////