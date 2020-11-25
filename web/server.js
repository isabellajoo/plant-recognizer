const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);


app.use(express.static('public'));
app.use('/scripts', express.static('node_modules'));
app.use(cors({
    credentials: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, function() {
    console.log("Express server has started on port 80");
});

app.get('/', function(req, res){
    res.render('home', {
    });
});

app.get('/load', function(req, res){
    res.render('load', {

    });
});

app.get('/result', function(req, res){
    if(localStorage.getItem("key") !== null) {
        var result = JSON.parse(localStorage.getItem("key"));
    } else {
        console.log('null');
    }
    connection.query('SELECT * FROM plants_newlist WHERE idx=' + result.classIndex[0], (error, rows) => {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log(rows);
            res.render('result', {
                slide_len: 7,
                result_len: 10,
                progress: 50,
                data: rows
            });
        }
    });

});

//var router = require('./router/main')(app, fs);

