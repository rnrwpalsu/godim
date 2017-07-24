//model / db.js

var mongoose = require('mongoose');
var uri = 'mongodb://localhost/test';
var options = {
    server: { poolSize: 100 }
};

var db = mongoose.createConnection(uri, options);

//연결되었을때 한번만
db.once('open', function() {
    console.log("MongoDB connected succesgully");
});

//에러 발생
db.on('error', function(err) {
    if (err) console.log('db err : ', err);
});

module.exports = db;