//models/db.js
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/test';
var options = {
    server: { poolSize: 100 }
};

var db = mongoose.createConnection(uri, options);

db.once('open', function() {
    console.log('MongoDB connected successfully');
});

db.on('error', function(err) {
    if (err) console.log('err : ', err);
});

module.exports = db;