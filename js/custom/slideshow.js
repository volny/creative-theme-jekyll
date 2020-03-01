/*!
 * Custom Javascript for the Image Slideshow
 */

/* Open */
function openSlideshow() {
	document.getElementById("slideshow").style.height = "100%";

	// keyboard event
	document.addEventListener( 'keydown', function( ev ) {
		var keyCode = ev.keyCode || ev.which;
		if (keyCode == 0 || keyCode == 27 || keyCode == 32) { // esc, space (chrome+firefox)
			closeSlideshow();
		}
	});
}

/* Close */
function closeSlideshow() {
  document.getElementById("slideshow").style.height = "0%";
}