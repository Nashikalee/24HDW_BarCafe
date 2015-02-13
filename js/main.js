function lancer() { // Function which replace window.onload
	addEvent(window, "load", scroll);
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
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
			return false;
		});
	});
}
///// End Scroll /////