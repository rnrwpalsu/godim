// models/db.js

var mongoose = require('mongoose');
var uri = "mongodb://localhost/test";

var options = {
    server: { poolSize: 100 }
};

var db = mongoose.createConnection(uri, options); // db 연결

//이벤트 등록 
db.on('open', function() {
    console.log("Mongodb connected successflly");
});

db.on('error', function(err) {
    if (err) console.log('db err : ', err);
});

module.exports = db;