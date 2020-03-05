/*!
 * Custom Javascript for the Image Slideshow
 */

/* Open the overlay in full screen */
function openSlideshow() {
	var elem = document.querySelector('.carousel');
	var flkty = new Flickity(elem, {
		watchCSS: true
	});

	document.getElementById("overlay").style.visibility = "visible";
};

/* Close the overlay on small devices */
function closeSlideshow() {
	document.getElementById("overlay").style.visibility = "hidden";
}

