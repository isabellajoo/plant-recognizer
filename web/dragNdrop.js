/*

window.onload = function() {
    var content = document.getElementsByClassName('content');
    var impugn = document.getElementById('img-upload');

    content.addEventListener("dragover", function( event ) {
        event.stopPropagation();
        event.preventDefault();

        if(event.type === "dragover") {
            console.log("dragover");
            impugn.classList.toggle("dragover");
        }

    }, false);

    content.addEventListener("dragleave", function( event ) {
        event.stopPropagation();
        event.preventDefault();
    }, false);

    content.addEventListener("uploadFiles", function( event ) {
        event.stopPropagation();
        event.preventDefault();
    }, false);
}

 */