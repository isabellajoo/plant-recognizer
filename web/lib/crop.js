window.addEventListener('DOMContentLoaded', function() {
    var image = document.getElementById('img-preview');
    var cropBoxData;
    var canvasData;
    var cropper;

    $('modal').on('shown.bs.modal', function() {
        cropper = new Cropper(image, {
            autoCropArea: 0.5,
            ready: function() {
                cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
            }
        });
    }).on('hidden.bs.modal', function() {
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();
    });
});