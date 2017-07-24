var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); // 웹서버 + 소켓io

server.listen(80); //웹서버 포트 80

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

//클라이언트 접속
io.sockets.on('connection', function(socket) {
    socket.on('send message', function(data) {
        io.sockets.emit('new message', data);
    });
});