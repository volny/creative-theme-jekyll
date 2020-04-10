/*!
 * Custom Javascript for the Image Slideshow
 */

function setupSlideshow(index) {
	// Create new Flickity carousel
	// Documentation: https://flickity.metafizzy.co/api.html#select
	var flkty = new Flickity(document.querySelector('.carousel'), {
		watchCSS: true
	});
	flkty.select(index - 1, false, true);

	// A '.resize()' of the Flickity carousel is required to properly initialize image cells.
	// Call '.reposition()' to position cells at selected position, should be triggered afer the size of a cell has been changed.
	// Use a singleton to improve the performances by resizing the carousel only once.
	var initalCarouselResize = 0;
	function resizeAfterFirstLazyLoad(element) {
		if (initalCarouselResize == 0) {
			initalCarouselResize = 1;
			flkty.resize();
			flkty.reposition();
		}
	}

	// Lazy load the gallery images as they appear.
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".carousel-cell-image",
		callback_loaded: resizeAfterFirstLazyLoad
	});

	// keyboard navigation events
	document.addEventListener( 'keydown', function( ev ) {
		if (flkty != null) {
			var keyCode = ev.keyCode || ev.which;
			if (keyCode == 27) { // escape
				self.closeSlideshow();
			}
		}
	});

	// After the complete setup focus on the carousel to enable the navigation via keyboard (accessibility).
	flkty.focus();
}

/* Open the overlay in full screen */
/* Change visibility of the overlay and the close button, hide the menu. */
function openSlideshow(index) {
	document.getElementById("overlay").style.visibility = "visible";
	document.getElementById("closeSlideshowButton").style.visibility = "visible";
	document.getElementById("navbarResponsive").style.visibility = "hidden";
	document.getElementById("collapsedMenu").style.visibility = "hidden";

	// Setup and display the carousel only after the overlay.
	// Otherwise the '.focus()' does not work which disable the default accessibility options.
	setupSlideshow(index);
};

/* Close the overlay on small devices */
/* hide the slideshow overlay and the close button, show the menu. */
function closeSlideshow() {
	document.getElementById("overlay").style.visibility = "hidden";
	document.getElementById("closeSlideshowButton").style.visibility = "hidden";
	document.getElementById("navbarResponsive").style.visibility = "visible";
	document.getElementById("collapsedMenu").style.visibility = "visible";
}
