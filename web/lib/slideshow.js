window.onload = function() {
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var dot_1 = document.getElementById("dot1");
    var dot_2 = document.getElementById("dot2");
    var dot_3 = document.getElementById("dot3");

    var slideIndex = 1;
    showSlides(slideIndex);

    prev.onclick = function() {
        plusSlides(-1);
    }
    next.onclick = function() {
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
}