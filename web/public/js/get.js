import demo from "./ml.js";

if(window.localStorage.getItem("imgcropped") !== null) {
    var image = document.getElementById('img-load');
    demo(image);
}

module.exports = {
    getIdxArr: function() {
        var topkIndices = [];
        for (var i = 0; i < index.length; i++) {
            topkIndices[i] = index[i];

            return topkIndices;
        }
    }
};
