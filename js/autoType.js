var text = ["Start Bootstrap can help build better websites using the CSS framework!",
            "Just download your template and start going, no strings attached!"]; // add more messages here!
var delay = 50;
var currentWord = 0;
var currentChar = 0;
var dest = document.getElementById("messages");;

function type() {
    dest.innerHTML = text[currentWord].substr(0, ++currentChar);
    if (currentChar > text[currentWord].length) setTimeout("unType()", 2000); // delay before erasing message
    else                                        setTimeout("type()", delay);
}

function unType() {
    dest.innerHTML = text[currentWord].substr(0, currentChar);
    if (--currentChar === 0) {
        dest.innerHTML = "<br>"; // otherwise page will jump due to line deletion
        if (currentWord + 1 === text.length) currentWord = 0;
        else ++currentWord;
        setTimeout("type()", 750); // delay before typing new message
    } else setTimeout("unType()", delay/2);
}

// delay typing for page to partially load
setTimeout("type()", 3000);