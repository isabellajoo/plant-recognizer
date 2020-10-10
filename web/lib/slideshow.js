var slidePrev = document.getElementById("slide-prev");
var slideNext = document.getElementById("slide-next");
var scrollPrev = document.getElementById("scroll-prev");
var scrollNext = document.getElementById("scroll-next");
var dot_1 = document.getElementById("dot1");
var dot_2 = document.getElementById("dot2");
var dot_3 = document.getElementById("dot3");

var slideIndex = 1;
showSlides(slideIndex);

slidePrev.onclick = function() {
    plusSlides(-1);
}
slideNext.onclick = function() {
    plusSlides(1);
}

dot_1.onclick = function() {
    currentSlide(1);
}
dot_2.onclick = function() {
    currentSlide(2);
}
dot_3.onclick = function() {
    currentSlide(3);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}