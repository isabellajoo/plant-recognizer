var scrollUp = document.getElementById("scroll-up");
var scrollDown = document.getElementById("scroll-down");
var scroll = document.getElementById("scroll-container");

scrollUp.onclick = function() {
    scroll.scrollTop -= 450;
}

scrollDown.onclick = function() {
    scroll.scrollTop += 450;
}