var http = require('http');
var url  = require('url');

var portNumber = process.argv[2];

function formatDate(date) {
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
}

function formateUnix(date) {
    return {
        unixtime: date.getTime()
    };
}

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    var urlObj = url.parse(req.url, true);
    
    var fileRoute = urlObj.pathname;
    var date = new Date(urlObj.query.iso);
    
    if (fileRoute == '/api/parsetime') {
        var data = formatDate(date);
    } else if(fileRoute == '/api/unixtime') {
        var data = formateUnix(date);
    }
    
    res.end(JSON.stringify(data));
});

server.listen(portNumber);