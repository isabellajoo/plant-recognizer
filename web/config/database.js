const mysql = require('mysql');

var dbInfo = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'plants_recognizer'
};

module.exports = function() {
    var dbconnection = {
        init : function() {
            return mysql.createConnection(dbInfo);
        },

        dbopen: function(con) {
            con.connect(function(err) {
                if (err) {
                    console.error("mysql connection error: " + err);
                } else {
                    console.info("mysql connection successfully.");
                }
            });
        }
    };
}