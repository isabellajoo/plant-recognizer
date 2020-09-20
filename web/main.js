var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res) {
    var _url = req.url;
    console.log('_url');
    console.log(_url);
    console.log('url');
    console.log(url);

    res.writeHead(200);
    res.end();

});
server.listen(8888);