window.onload = function() {
    var blur = document.getElementById('blur');
    var modal = document.getElementById('modal');
    var cancel = document.getElementById('cancel');

    /*
    imgupload.onclick = function() {
        blur.classList.toggle("active");
        modal.classList.toggle("active");
    }
    */

    cancel.onclick = function() {
        blur.classList.toggle("active");
        modal.classList.toggle("active");
    }

    /*
    window.onclick = function(event) {
        if (event.target === blur) {
            console.log('windowOk');
            blur.classList.toggle("active");
            modal.classList.toggle("active");
        }
    }
     */
}