/*!
 * Custom Javascript used for the Language Switcher
 */

var selectEl = document.getElementById('redirectSelect');

selectEl.onchange = function(){
    var destination = this.value;
    window.location = destination;
};
