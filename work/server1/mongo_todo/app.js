var express = require('express');
var app = express();

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/test');

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

var Todo = mongoose.model('Todo', { text: String, done: Boolean });
app.get('/todos', function(req, res) {
    Todo.find(function(err, rows) { // 다 찾기
        if (err) return res.send(err);
        else res.json(rows);
    });
});

//var text = req.body.text; 이런식으로 대입도 가능

app.post('/todos', function(req, res) {
    var todo = { text: req.body.text, done: false }
    Todo.create(todo, function(err, row) {
        if (err) return res.send(err);
        Todo.find(function(err, rows) {
            if (err) return res.send(err);
            else res.json(rows);
        });
    });
});

app.delete('/todos/:id', function(req, res) {
    var delOption = { _id: req.params.id }
    Todo.remove(delOption, function(err, row) {
        if (err) return res.send(err);
        Todo.find(function(err, rows) {
            if (err) return res.send(err);
            else res.json(rows);
        });
    });
});
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(port);
console.log('Server started!!!!!!!!!!');