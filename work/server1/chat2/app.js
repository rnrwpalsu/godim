var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); // 웹서버 + 소켓io
var nicknames = []; // 사용자 이름

server.listen(80); //웹서버 포트 80

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

//클라이언트 접속
io.sockets.on('connection', function(socket) {
    socket.on('new user', function(nick, callback) {
        if (nicknames.indexOf(nick) != -1) {
            callback(false);
        } else {
            callback(true);
            socket.nickname = nick;
            nicknames.push(socket.nickname);
            updateNicknames();
        }
    });

    function updateNicknames() {
        console.log('nicknames : ', nicknames);
        io.sockets.emit('usernames', nicknames); // ['hong', 'jang] 이런식으로

    }

    socket.on('send message', function(msg) {
        // 메세지와 닉네임 같이 보냄
        io.sockets.emit('new message', { nick: socket.nickname, msg: msg });

    });
    // 접속 종료
    socket.on('disconnect', function(data) {
        if (!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    });
});