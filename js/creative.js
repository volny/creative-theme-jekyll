/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Modified by Kevin Delord to fit the current/new website and the plugin updates (css and JS).
 *
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

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 100
    });

    // Function to toggle the navigation bar design
    var toggleAffix = function(affixElement) {
        if (document.documentElement.scrollTop >= 100){
            affixElement.addClass("navbar-scrolled");
        } else {
            affixElement.removeClass("navbar-scrolled");
        }
    };

    // Init the nav bar design toggle
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

    // Reload the complete website when selecting a new language from the Language Switcher.
    document.getElementById('redirectSelect').onchange = function() {
        var destination = this.value;
        window.location = destination;
    };

})(jQuery); // End of use strict
