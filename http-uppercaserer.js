var http = require('http');
var fs = require('fs');
var map = require('through2-map');

var portNumber = process.argv[2];

var server = http.createServer(function(req, res) {
    if (req.method === 'POST') { 
        req.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase();
        })).pipe(res);
    } else {
        res.end('Send a POST request\n');
    }
});

server.listen(portNumber)