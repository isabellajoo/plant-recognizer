const slidePrev = document.getElementById("slide-prev");
const slideNext = document.getElementById("slide-next");
const dot_1 = document.getElementById("dot1");
const dot_2 = document.getElementById("dot2");
const dot_3 = document.getElementById("dot3");
const dot_4 = document.getElementById("dot4");
const dot_5 = document.getElementById("dot5");

let slideIndex = 1;
showSlides(slideIndex);

slidePrev.onclick = function () {
    plusSlides(-1);
}
slideNext.onclick = function () {
    plusSlides(1);
}

dot_1.onclick = function () {
    currentSlide(1);
}
dot_2.onclick = function () {
    currentSlide(2);
}
dot_3.onclick = function () {
    currentSlide(3);
}
dot_4.onclick = function () {
    currentSlide(4);
}
dot_5.onclick = function () {
    currentSlide(5);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}