const mysql = require('mysql');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);
import loadML from "./load.js";

var array = [];
array = loadML();

async function dbConn(arr) {
    connection.connect();

    connection.query('SELECT * FROM plants_newlist WHERE idx=' + arra[0], (error, rows) => {
        if (error) throw error;
        console.log('Plant list\n', rows);

        return rows;
    });
}

dbConn(array);

/*
module.exports = function() {
    var plantList = {
        list: function(req, res) {
            var sql = 'SELECT name, index FROM plants_newlist WHERE index=1';
            dbconn.query(sql, function(err, results, field) {
                if(err) throw err;
                else {
                    return results
                }
            });
        }
    };
}
 */

