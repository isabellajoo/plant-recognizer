window.addEventListener('DOMContentLoaded', function () {
    var image = document.getElementById('img-preview');
    var cropBoxData;
    var canvasData;
    var cropper;

    $('#modal').on('shown.bs.modal', function () {
        $('#img-preview').cropper('destroy');
        cropper = new Cropper(image, {
            autoCropArea: 0.5,
            viewMode: 1,
            center: true,
            dragMode: 'move',
            movable: true,
            scalable: true,
            guides: true,
            zoomOnWheel: true,
            cropBoxMovable: true,
            wheelZoomRatio: 0.1,
            ready: function () {
                cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
            }
        })
    }).on('hidden.bs.modal', function () {
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();
        cropper.destroy();
    })
})