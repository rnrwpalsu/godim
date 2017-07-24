var express = require('express');
var app = express();

// https://localhost:3000/
app.get('/', function(req, res) {
    res.send('Hello World!');
});

// https://localhost:3000/hi
app.get('/hi', function(req, res) {
    //res.send('Hi World!');
    res.sendfile("index.html")
});

// https://localhost:3000/api1
app.get('/api1', function(req, res) {
    res.send("hello");
});

app.listen(3000, function() {
    console.log('Server start!');
});