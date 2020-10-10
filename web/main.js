const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');
const template = require('./lib/template.js');
//const resize = require('./lib/resize.js');

const app = express();

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function() {
    console.log('server start: ' + app.get('port'));
});

app.get('/', function(req, res){
    var title = 'Plant Recognizer';
    var image = 'data/image/logo_temp.png';

    //var html = template.HTML(title, image);

    fs.readFile(image, function(err, data) {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(data);
    })
});

/*
server.on('connection', function(socket) {
    var addr = socket.address();
    console.log('client access: %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res) {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        var title = 'Plant Recognizer';
        var image = 'data/image/logo_temp.png';
        fs.readFile(image, function(err, data) {
            var html = template.HTML(title, image);
            res.writeHead(200);
            res.end(html);
        });
    }
    else {
        res.writeHead(404);
        res.end('Not found');
    }

    console.log('client request');
    console.dir(req);
});

server.on('close', function() {
    console.log('server stopped');
})
 */