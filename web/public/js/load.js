//const mysql = require('mysql');
//const dbconfig = require('../../config/database.js');
//const connection = mysql.createConnection(dbconfig);
//const done = require('../js/done.js');
import {PLANT_LIST} from './plantlist.js';
import demo from "./ml.js";

async function loadML() {
    //var result = [];
    try {
        if(window.localStorage.getItem("imgcropped") !== null) {
            var image = document.getElementById('img-load');
            await demo(image);

            if(localStorage.getItem("key") !== null) {
                var key = JSON.parse(localStorage.getItem("key"));
                //console.log('localStorage: ' + key);
                var classIndex = [];
                for (var i = 0; i < key.length; i++) {
                    var obj = {};
                    obj =  key[i].classIndex;

                    classIndex.push(obj);
                }
                localStorage.setItem("classIndex", JSON.stringify(classIndex));
                console.log(JSON.stringify(classIndex));

                var probability = [];
                for (var i = 0; i < key.length; i++) {
                    var obj = {};
                    obj =  key[i].probability * 100;
                    obj = obj.toFixed(0);

                    probability.push(obj);
                }

                localStorage.setItem("probability", JSON.stringify(probability));
                console.log(JSON.stringify(probability));
                //localStorage.setItem("probability", probability);

                var name = [];
                for (var i = 0; i < key.length; i++) {
                    var obj = {};
                    obj =  PLANT_LIST[key[i].classIndex];

                    name.push(obj);
                }

                localStorage.setItem("resultName", JSON.stringify(name));
                console.log(JSON.stringify(name));


                var href = "http://www.plants-recognizer.gq/result?id=" + classIndex[0] + "&prob=" + probability[0];
                //console.log('location: ' + href);
                await redirect(href)
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

loadML();

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
