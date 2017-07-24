var async = require('async');
//객체로
async.series({
        one: function(callback) {
            setTimeout(function() {
                //코드1
                callback(null, 1);
            }, 200);
        },
        two: function(callback) {
            setTimeout(function() {
                //코드2
                callback(null, 2);
            }, 100);
        }
    },
    function(err, results) {
        console.log('results : ', results); // {one : 1, twe : 2}
    });