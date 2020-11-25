const {demo} = require("./ml");

//var index = [];

if(window.localStorage.getItem("imgcropped") !== null) {
    var image = window.localStorage.getItem("imgcropped");
    demo(image);
}
/*
module.exports = {
    getIdxArr: function() {
        var topkIndices = [];
        for (var i = 0; i < index.length; i++) {
            topkIndices[i] = index[i];

            return topkIndices;
        }
    }
};
 */