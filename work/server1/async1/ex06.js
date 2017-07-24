var async = require('async');

async.parallel({
        myFirstFunction,
        mySecondFunction
    },
    function(err, results) {
        console.log('results : ', results); // {myFirstFunction : 1. mySecondFunction :2}
    }
);

function myFirstFunction(callback) {
    setTimeout(function() {
        console.log('code1');
        callback(null, 1);
    }, 200);
}

function mySecondFunction(callback) {
    setTimeout(function() {
        console.log('code2');
        callback(null, 2);
    }, 100);
}