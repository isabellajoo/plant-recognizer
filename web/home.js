window.onload = function() {
    var blur = document.getElementById("blur");
    var modal = document.getElementById("modal");

    blur.onclick = function() {
        blur.classList.toggle("active");
        modal.classList.toggle("active");
    }

    modal.onclick = function() {
        blur.classList.toggle("active");
        modal.classList.toggle("active");
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            blur.classList.toggle("active");
            modal.classList.toggle("active");
        }
    }
}