//import demo from "./ml.js";
/*
const done = document.getElementById('done');
const imgcropped = document.getElementById('img-cropped');

done.addEventListener('click', (e) => {
    console.log('done...');

    var newSrc = cropper.getCroppedCanvas({
        maxWidth: 300,
        maxHeight: 300
    }).toDataURL();

    imgcropped.src = newSrc;
    window.localStorage.setItem("imgcropped", newSrc);
})
 */

$('#done').click(function() {
    $('#img-upload').submit();

    console.log('done...');

    var newSrc = cropper.getCroppedCanvas({
        maxWidth: 300,
        maxHeight: 300
    }).toDataURL();

    $('#img-cropped').src = newSrc;
    window.localStorage.setItem("imgcropped", newSrc);
})