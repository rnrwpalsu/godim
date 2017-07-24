var async = require('async');

//waterfall 사용

async.waterfall([
        function(callback) {
            //코드1
            callback(null, 'one', 'two');
        },
        function(arg1, arg2, callback) {
            //코드2
            console.log('arg1 : ', arg1, 'arg2 : ', arg2); //arg1 = 'one', arg2 = 'two'
            callback(null, 'three');
        },
        function(arg1, callback) {
            //코드3
            console.log('arg1 : ', arg1); //arg1 = 'three'
            callback(null, 'done');
        }
    ],
    function(err, results) {
        console.log('results : ', results); // results : done
    }
);