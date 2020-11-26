const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const ml = require('./public/js/ml.js');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/scripts', express.static('node_modules'));
app.use(cors({
    origin: "http://www.plants-recognizer.gq",
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
app.get('/load', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.render('load', {
    });
});
app.get('/result', function(req, res){
    console.log('url: ' + decodeURI(req.url));
    console.log('query: ' + req.params);
    /*
    var responseData = req.body;
    console.log('len: ' + responseData.length);
    for(var i = 0; i < responseData.length; i++) {
        console.log('responseData: ' + responseData[i].classIndex);
    }
    console.log ('responseData: ' + responseData);

    connection.query('SELECT * FROM plants_newlist WHERE idx=99', (error, rows) => {
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
    */
});

//var router = require('./router/main')(app, fs);


