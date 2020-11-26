//const mysql = require('mysql');
//const dbconfig = require('../../config/database.js');
//const connection = mysql.createConnection(dbconfig);
//const done = require('../js/done.js');
import demo from "./ml.js";

async function loadML() {
    //var result = [];
    try {
        if(window.localStorage.getItem("imgcropped") !== null) {
            var image = document.getElementById('img-load');
            await demo(image);

            if(localStorage.getItem("key") !== null) {
                var key = JSON.parse(localStorage.getItem("key"));
                console.log('len: ' + key.length);
                var array = new Array();
                for (var i = 0; i < key.length; i++) {
                    var data = new Object();

                    data.classIndex = key[i].classIndex;
                    data.probability = key[i].probability;

                    array.push(data);
                }
                console.log(array);
                console.log(JSON.stringify(array));

                var params = { key: array };
                console.log(params);

                /*
                $("post").click(function () {
                    $.ajax({
                        url: "/result",
                        type: "POST",
                        traditional: true,
                        dataType: "JSON",
                        data: { key: key },
                        success: function (data) {
                            console.log("data trasmit success: " + data);
                        },
                        error: function (xhr, status, error){
                            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                        }
                    })
                })
                */


                //console.log('localStorage: ' + key);
                var href = "http://www.plants-recognizer.gq/result?" + $.param(params);
                //console.log('location: ' + href);
                //await redirect(href)

            }

            //return result;

        }
    } catch (e) {
        console.log('ML load error: ' + e);
    }
}

async function redirect(url) {
    var ua        = navigator.userAgent.toLowerCase(),
        isIE      = ua.indexOf('msie') !== -1,
        version   = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9) {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
    else {
        window.location.href = url;
    }
}

//loadML();

/*
async function dbConn(arr) {
    connection.connect();

    connection.query('SELECT * FROM plants_newlist WHERE idx=' + result[0], (error, rows) => {
        if (error) throw error;
        console.log('Plant list\n', rows);
    });

    connection.end();
}

//window.location.href ='localhost:3000/result';
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
