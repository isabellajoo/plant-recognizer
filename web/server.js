const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

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

app.get('/result', function(req, res){
    res.render('result', {
        slide_len: 7,
        result_len: 10,
        progress: 50
    });
});

