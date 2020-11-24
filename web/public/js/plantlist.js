var dbConObj = require('../../config/database.js');
var dbconn = dbConObj.init();
const fs = require('fs');
const ejs = require('ejs');

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