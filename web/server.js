var express = require('express');
var cors = require('cors');
var app = express();
var session = require('express-session');
var fs = require('fs');

app.use(express.static('public'));
app.use('/scripts', express.static('node_modules'));
app.use(cors({
    credentials: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function() {
    console.log("Express server has started on port 3000");
});

var router = require('./router/main')(app, fs);

