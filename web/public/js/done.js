const {demo} = require("./ml");

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

    var index = [];
    index = demo(imgcropped);

    module.exports = {
        getIdxArr: function() {
            var topkIndices = [];
            for (var i = 0; i < index.length; i++) {
                topkIndices[i] = index[i];

                return topkIndices;
            }
        }
    };
})