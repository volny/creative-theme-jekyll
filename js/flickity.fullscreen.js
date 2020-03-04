/*!
 * Flickity fullscreen v1.1.1
 * Enable fullscreen view for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity')
    );
  } else {
    // browser global
    factory(
      window.Flickity
    );
  }

}( window, function factory( Flickity ) {

'use strict';

Flickity.createMethods.push('_createFullscreen');
var proto = Flickity.prototype;


proto._createFullscreen = function() {
  this.isFullscreen = false;

  if ( !this.options.fullscreen ) {
    return;
  }
  // buttons
  this.viewFullscreenButton = new FullscreenButton( 'view', this );
  this.exitFullscreenButton = new FullscreenButton( 'exit', this );

  this.on( 'activate', this._changeFullscreenActive );
  this.on( 'deactivate', this._changeFullscreenActive );
};

// ----- activation ----- //

proto._changeFullscreenActive = function() {
  var childMethod = this.isActive ? 'appendChild' : 'removeChild';
  this.element[ childMethod ]( this.viewFullscreenButton.element );
  this.element[ childMethod ]( this.exitFullscreenButton.element );
  // activate or deactivate buttons
  var activeMethod = this.isActive ? 'activate' : 'deactivate';
  this.viewFullscreenButton[ activeMethod ]();
  this.exitFullscreenButton[ activeMethod ]();
};

// ----- view, exit, toggle ----- //

proto.viewFullscreen = function() {
  this._changeFullscreen( true );
  this.focus();
};

proto.exitFullscreen = function() {
  this._changeFullscreen( false );
};

proto._changeFullscreen = function( isView ) {
  if ( this.isFullscreen == isView ) {
    return;
  }
  this.isFullscreen = isView;
  var classMethod = isView ? 'add' : 'remove';
  document.documentElement.classList[ classMethod ]('is-flickity-fullscreen');
  this.element.classList[ classMethod ]('is-fullscreen');
  this.resize();
  // HACK extra reposition on fullscreen for images
  if ( this.isFullscreen ) {
    this.reposition();
  }
  this.dispatchEvent( 'fullscreenChange', null, [ isView ] );
};

proto.toggleFullscreen = function() {
  this._changeFullscreen( !this.isFullscreen );
};

// ----- setGallerySize ----- //

// overwrite so fullscreen cells are full height
var setGallerySize = proto.setGallerySize;
proto.setGallerySize = function() {
  if ( !this.options.setGallerySize ) {
    return;
  }
  if ( this.isFullscreen ) {
    // remove height style on fullscreen
    this.viewport.style.height = '';
  } else {
    // otherwise, do normal
    setGallerySize.call( this );
  }
};

// ----- keyboard ----- //

// ESC key closes full screen
Flickity.keyboardHandlers[27] = function() {
  this.exitFullscreen();
};

// ----- FullscreenButton ----- //

function FullscreenButton( name, flickity ) {
  this.name = name;
  this.createButton();
  this.createIcon();
  // events
  // trigger viewFullscreen or exitFullscreen on click
  this.onClick = function() {
    flickity[ name + 'Fullscreen' ]();
  };
  this.clickHandler = this.onClick.bind( this );
}

FullscreenButton.prototype.createButton = function() {
  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-fullscreen-button ' +
    'flickity-fullscreen-button-' + this.name;
  // prevent button from submitting form
  element.setAttribute( 'type', 'button' );
  // set label
  var label = capitalize( this.name + ' full-screen' );
  element.setAttribute( 'aria-label', label );
  element.title = label;
};

function capitalize( text ) {
  return text[0].toUpperCase() + text.slice(1);
}

var svgURI = 'http://www.w3.org/2000/svg';

var pathDirections = {
  view: 'M15,20,7,28h5v4H0V20H4v5l8-8Zm5-5,8-8v5h4V0H20V4h5l-8,8Z',
  exit: 'M32,3l-7,7h5v4H18V2h4V7l7-7ZM3,32l7-7v5h4V18H2v4H7L0,29Z',
};

FullscreenButton.prototype.createIcon = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 32 32' );
  // path & direction
  var path = document.createElementNS( svgURI, 'path');
  var direction = pathDirections[ this.name ];
  path.setAttribute( 'd', direction );
  // put it together
  svg.appendChild( path );
  this.element.appendChild( svg );
};

FullscreenButton.prototype.activate = function() {
  this.element.addEventListener( 'click', this.clickHandler );
};

FullscreenButton.prototype.deactivate = function() {
  this.element.removeEventListener( 'click', this.clickHandler );
};

Flickity.FullscreenButton = FullscreenButton;

// ----- fin ----- //

return Flickity;

}));
