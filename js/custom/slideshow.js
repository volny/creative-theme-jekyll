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

	// A resize of the Flickity carousel is required to properly initialize image cells -->
	// Use a singleton to improve the performances by resizing the carousel only once.
	var initalCarouselResize = 0;
	function resizeAfterFirstLazyLoad(element) {
		if (initalCarouselResize == 0) {
			initalCarouselResize = 1;
			flkty.resize();
		}
	}

	// Lazy load the gallery images as they appear.
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".carousel-cell-image",
		callback_loaded: resizeAfterFirstLazyLoad
	});
}

/* Open the overlay in full screen */
function openSlideshow(index) {
	setupSlideshow(index);

	// Change visibility of the overlay.
	document.getElementById("overlay").style.visibility = "visible";
};

/* Close the overlay on small devices */
function closeSlideshow() {
	document.getElementById("overlay").style.visibility = "hidden";
}
