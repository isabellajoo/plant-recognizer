window.addEventListener('load', function() {
    if(window.localStorage.getItem("imgcropped") !== null) {
        document.getElementById('img-search').src = window.localStorage.getItem("imgcropped");
    }

    var resName = document.getElementsByClassName('result-name')[0].innerText;
    var imgResult = document.getElementsByClassName('img-result');
    for (var i = 0; i < 5; i++) {
        imgResult[i].src = "image/" + resName + " 식물/google_000"+ i +".jpg"
    }

    if (localStorage.getItem("resultName") !== null) {
        var imgOther = document.getElementsByClassName('img-other-result');
        var resultName = document.getElementsByClassName('result-name');
        var array = JSON.parse(localStorage.getItem("resultName"));

        for (var i = 1; i < array.length; i++) {
            resultName[i].innerHTML = array[i];
            imgOther[i - 1].src = "image/" + array[i] + " 식물/google_0000.jpg";
        }
    }

    if (localStorage.getItem("classIndex") !== null && localStorage.getItem("probability") !== null) {
        var resultHREF = document.getElementsByClassName('result-other-href');
        var arrayIndex = JSON.parse(localStorage.getItem("classIndex"));
        var arrayProb = JSON.parse(localStorage.getItem("probability"));
        for (var i = 1; i < arrayIndex.length; i++) {
            resultHREF[i - 1].setAttribute('href', '/result?id=' + arrayIndex[i] + '&prob=' + arrayProb[i]);
        }
    }

    /*
    if (localStorage.getItem("probability") !== null) {
        var progress = document.getElementsByClassName('progress-txt-other');
        var array = JSON.parse(localStorage.getItem("probability"));
        console.log(array);

        for (var i = 0; i < array.length; i++) {
            progress[i].innerHTML = array[i + 1];
        }
    }
    */
});