var async = require('async');

//parallel 사용
async.parallel([
        function(callback) {
            setTimeout(function() {
                console.log('code1');
                callback(null, 'one');
            }, 200);
        },
        function(callback) {
            setTimeout(function() {
                console.log('code2');
                callback(null, 'two');
            }, 100);
        }
    ],

    function(err, results) {
        console.log('result : ', results);
    });