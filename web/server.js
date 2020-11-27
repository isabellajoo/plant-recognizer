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

const server = app.listen(80, function() {
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
    connection.query('SELECT * FROM plants_newlist WHERE idx=' + req.query.id, (error, rows) => {
        if (error) {
            console.log(error);
            throw error;
        } else {
            var prog
            if(req.query.prob === 100) {
                prog = req.query.prob - 1;
                console.log(prog);
            } else {
                prog = req.query.prob;
            }
            console.log(rows);
            res.render('result', {
                result_len: 10,
                progress: prog,
                data: rows,
            });
        }
    });
});

//var router = require('./router/main')(app, fs);

