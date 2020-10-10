window.onload = function() {
    var image = document.getElementById('img-preview');
    var cropBoxData;
    var canvasData;
    var cropper;

    $('modal').on('shown.bs.modal', function() {
        cropper = new Cropper(image, {
            autoCropArea: 0.5,
            ready: function() {
                cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
            },
            crop: function(e) {
                console.log(e.detail.x);
                console.log(e.detail.y);
                console.log(e.detail.width);
                console.log(e.detail.height);
                console.log(e.detail.rotate);
                console.log(e.detail.scaleX);
                console.log(e.detail.scaleY);
            }
        });
    }).on('hidden.bs.modal', function() {
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();
    });

}