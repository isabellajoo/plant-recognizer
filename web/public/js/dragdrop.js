const dropArea = document.getElementById('drop-area');
const imgpreview = document.getElementById('img-preview');
const blur = document.getElementById('blur');
const modal = document.getElementById('modal');
const cancel = document.getElementById('cancel');
const imgcropped = document.getElementById('img-cropped');

let cropBoxData;
let canvasData;
let cropper;

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
})

;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files)
}

function handleFiles(files) {
    files = [...files];
    files.forEach(previewFile);
}

function previewFile(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        imgpreview.src = reader.result;
        popUp();
    }
}



function popUp() {
    blur.classList.toggle('active');
    modal.classList.toggle('active');

    cropper = new Cropper(imgpreview, {
        autoCrop: true,
        autoCropArea: 0.5,
        viewMode: 1,
        center: true,
        dragMode: 'none',
        movable: true,
        scalable: true,
        guides: true,
        zoomable: false,
        cropBoxMovable: true,
        ready: function () {
            console.log('cropper');
            cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        }
    })
}

cancel.onclick = function() {
    blur.classList.toggle('active');
    modal.classList.toggle('active');

    cropper.destroy();
    cropper = null;
}

/*
window.onclick = function(e) {
    var isClickInside = modal.contains(e.target);

    if (!isClickInside) {
        blur.classList.toggle('active');
        modal.classList.toggle('active');
    }

    cropper.destroy();
    cropper = null;
}
 */