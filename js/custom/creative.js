/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });


    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggler').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Function to toggle the navigation bar design
    var toggleAffix = function(affixElement) {
        if (document.documentElement.scrollTop >= 100){
            affixElement.addClass("navbar-scrolled");
        } else {
            affixElement.removeClass("navbar-scrolled");
        }
    };

    // Init tge nav bar design toggle
    $('[data-toggle="affix"]').each(function() {
        var element = $(this)
        // element.before(wrapper);
        $(window).on('scroll resize', function() {
            toggleAffix(element, $(this));
        });

        // init
        toggleAffix(element, $(window));
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    // initialize LazyLoad
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".img-lazy"
    });

})(jQuery); // End of use strict
