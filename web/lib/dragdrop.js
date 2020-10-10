var dropArea = document.getElementById('drop-area');
var imgpreview = document.getElementById('img-preview');
var blur = document.getElementById('blur');
var modal = document.getElementById('modal');
var cancel = document.getElementById('cancel');

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
}

cancel.onclick = function() {
    blur.classList.toggle('active');
    modal.classList.toggle('active');
    imgpreview.src = '';
}

