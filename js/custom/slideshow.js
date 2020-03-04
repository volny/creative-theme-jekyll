/*!
 * Custom Javascript for the Image Slideshow
 */

/* Open */
function openSlideshow() {
	document.getElementById("slideshow").style.height = "100%";

	// keyboard events
	// Left and Right arrows already work but only they "slides" have already been presented.
	document.addEventListener('keydown', function( ev ) {
		var keyCode = ev.keyCode || ev.which;
		if (keyCode == 27 || keyCode == 0 || keyCode == 32) { // esc touch, space bar (chrome, firefox),
			closeSlideshow();
		}
	});
}

/* Close */
function closeSlideshow() {
  document.getElementById("slideshow").style.height = "0%";
}

