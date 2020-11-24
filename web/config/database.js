var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: '13.125.65.71',
    user: 'root',
    password: '123456',
    database: 'plants_recognizer'
});

connection.connect();

connection.query('SELECT * from Users', function(err, res, fileds){
    if(err) {
        console.error(err.stack);
        return ;
    }
    console.log('User info is: ', res);
});


connection.end();