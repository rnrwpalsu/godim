var async = require('async');

async.waterfall([
        myFirstFunction,
        mySecondFunction,
        myLastFunction
    ],
    function(err, results) {
        if (err) return console.log('err : ', err);
        console.log('results : ', results);
    }
);

function myFirstFunction(callback) {
    callback(null, 'one', 'two');
}

function mySecondFunction(arg1, arg2, callback) {
    console.log('arg1 : ', arg1, 'arg2 : ', arg2); //arg1 = 'one', arg2 = 'two'
    callback(null, 'three');
}

function myLastFunction(arg1, callback) {
    console.log('arg1 : ', arg1); //arg1 = 'three'
    callback(null, 'done');
}