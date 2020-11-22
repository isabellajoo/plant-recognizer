const express = require('express');
const cors = require('cors');
const app = express();
//var session = require('express-session');
const fs = require('fs');

app.use(express.static('public'));
app.use('/scripts', express.static('node_modules'));
app.use(cors({
    credentials: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, function() {
    console.log("Express server has started on port 3000");
});

const router = require('./router/main')(app, fs);

