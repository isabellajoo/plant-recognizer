var dropArea = document.getElementById('drop-area');
var imgpreview = document.getElementById('img-preview');
var blur = document.getElementById('blur');
var modal = document.getElementById('modal');
var cancel = document.getElementById('cancel');

var cropBoxData;
var canvasData;
var cropper;

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
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
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
            cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        }
    })
}

cancel.onclick = function() {
    blur.classList.toggle('active');
    modal.classList.toggle('active');
    imgpreview.src = '';

    cropper.destroy();
}

