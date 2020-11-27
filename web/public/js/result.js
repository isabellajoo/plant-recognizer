window.addEventListener('load', function() {
    if(window.localStorage.getItem("imgcropped") !== null) {
        document.getElementById('img-search').src = window.localStorage.getItem("imgcropped");
    }

    if (localStorage.getItem("resultName") !== null) {
        var resultName = document.getElementsByClassName('result-name');
        var takeName = JSON.parse(localStorage.getItem("resultName"));
        var takeIndex = JSON.parse(localStorage.getItem("classIndex"));
        var takeProb = JSON.parse(localStorage.getItem("probability"));
        console.log(takeName);
        console.log(takeIndex);
        console.log(takeProb);

        var arrayName = [];
        var arrayIndex = [];
        var arrayProb = [];
        for (var i = 0; i < takeName.length; i++) {
            if (resultName[0].innerText !== takeName[i]) {
                arrayName.push(takeName[i]);
                arrayIndex.push(takeIndex[i]);
                arrayProb.push(takeProb[i]);
            }
        }
        console.log(arrayName);
        console.log(arrayIndex);
        console.log(arrayProb);

        var imgResult = document.getElementsByClassName('img-result');
        for (var i = 0; i < 5; i++) {
            imgResult[i].src = "image/" + resultName[0].innerText + " 식물/google_000"+ i +".jpg"
        }

        for (var i = 5; i < imgResult.length; i++) {
            resultName[i - 4].innerHTML = arrayName[i - 5];
            imgResult[i].src = "image/" + arrayName[i - 5] + " 식물/google_0000.jpg";
        }

        console.log(arrayProb.length)
        if (localStorage.getItem("classIndex") !== null && localStorage.getItem("probability") !== null) {
            var resultHREF = document.getElementsByClassName('result-other-href');
            var progResult = document.getElementsByClassName('progress-txt');
            var progValue = document.getElementsByClassName('progress-value');
            for (var i = 0; i < arrayProb.length; i++) {
                resultHREF[i].setAttribute('href', '/result?id=' + arrayIndex[i] + '&prob=' + arrayProb[i] + '&result=' + takeProb.length);
                progValue[i + 1].style.width = arrayProb[i] + '%';
                progResult[i + 1].innerHTML = arrayProb[i] + '%';
            }
        }

        if(takeProb.length > 3) {
            var scrollBtn = document.getElementsByClassName('scroll-btn');
            for (var i = 0; i < scrollBtn.length; i++) {
                scrollBtn[i].style.display = 'inline';
            }
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