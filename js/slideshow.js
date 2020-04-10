/*!
 * Custom Javascript for the Image Slideshow
 */

function preloadImagesAroundIndex(index) {
	var items = ["lazy-img-" + (index - 1), "lazy-img-" + index, "lazy-img-" + (index + 1)];
	items.forEach(function(item, index) {
		var element = document.getElementById(item);
		if (element != null) {
			if (element.hasAttribute("data-src")) {
				element.setAttribute("src", element.getAttribute("data-src"));
				element.removeAttribute("data-src");
			}
		}
	});
};

function setupSlideshow(selected_index) {
	// Create new Flickity carousel
	var flkty = new Flickity(document.querySelector('.carousel'), {
		watchCSS: true,
		on: {
			// Documentation: https://flickity.metafizzy.co/api.html#select
			// Add an event listener on 'select' to preload the upcoming images of the slideshow.
			// The given index parameter is zero-based but not the index of the images in the HTML (+1).
			select: function(index) { preloadImagesAroundIndex(index + 1); }
		}
	});
	// Select the correct slide each time the carousel is displayed.
	// Flickity expects a zero-based index but not the given one as parameter is not (-1).
	flkty.select(selected_index - 1, false, true);

	// After the complete setup focus on the carousel to enable the navigation via keyboard (accessibility).
	flkty.focus();
}

// Function called on 'keydown' events to detect the escape key press to exit the slideshow.
function exitSlideshowOnKeydown(event) {
	var keyCode = event.keyCode || event.which;
	if (keyCode == 27) { // escape
		self.closeSlideshow();
	}
}

function lazyloadSelectedImageAtIndex(index, callback) {
	var element = document.getElementById("lazy-img-" + index);
	if (element != null) {
		if (element.hasAttribute("data-src")) {
			element.setAttribute("src", element.getAttribute("data-src"));
			element.removeAttribute("data-src");
			element.onload = function() {
				callback();
			}
		} else {
			callback();
		}
	}
}

/* Open the overlay in full screen */
/* Change visibility of the overlay and the close button, hide the menu. */
function openSlideshow(index) {
	document.getElementById("overlay").style.visibility = "visible";
	document.getElementById("closeSlideshowButton").style.visibility = "visible";
	document.getElementById("navbarResponsive").style.visibility = "hidden";
	document.getElementById("collapsedMenu").style.visibility = "hidden";
	document.addEventListener("keydown", exitSlideshowOnKeydown);

	// Setup and display the carousel only after the overlay and after the first image load.
	// This way the viewport will be properly loaded and all images lazy-loaded and prefetched as expected.
	lazyloadSelectedImageAtIndex(index, function() {
		setupSlideshow(index);
	});
};

/* Close the overlay on small devices */
/* hide the slideshow overlay and the close button, show the menu. */
function closeSlideshow() {
	document.getElementById("overlay").style.visibility = "hidden";
	document.getElementById("closeSlideshowButton").style.visibility = "hidden";
	document.getElementById("navbarResponsive").style.visibility = "visible";
	document.getElementById("collapsedMenu").style.visibility = "visible";
	document.removeEventListener("keydown", exitSlideshowOnKeydown);
}
