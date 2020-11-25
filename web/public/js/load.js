const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);
const done = require('../js/done.js');
import demo from "./ml.js";

var result = [];
if(window.localStorage.getItem("imgcropped") !== null) {
    var image = document.getElementById('img-load');

    demo(image).then(index => {
        for (var i = 0; i < index.length; i++) {
            result[i] = index[i];
        }

        return result;
    });
}

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
