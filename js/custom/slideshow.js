/*!
 * Custom Javascript for the Image Slideshow
 */

/* Open slide show in full screen */
function openSlideshow() {
	var elem = document.querySelector('.carousel');
	var flkty = new Flickity(elem, {
		watchCSS: true,
		fullscreen: true // Display the 'close full screen' button.
	});

	// if (window.innerWidth > 1000) {
		// Trigger the full screen
		flkty.viewFullscreen();
	// } else {
		// magic needed
	// }
};

/* Close the slideshow on small devices */
function closeSlideshow() {
  // maybe magic needed
}

