var http = require('http');
var MessageBus = require('../..').MessageBus;
var bus = new MessageBus();

var server = this._server = http.createServer(function (req, res) {
    (function delayRequest(start) {
        setTimeout(function () {
            bus.publish('total_requests');
            bus.publish('requests_by_path', req.url);
            bus.publish('average_request_time', new Date() - start);
            bus.publish('request_time_by_path', new Date() - start, req.url);
            res.writeHead(200);
            res.end('Ok');
        }, Math.random() * 20 + 100);
    })(new Date());
});

server.listen(8000);
