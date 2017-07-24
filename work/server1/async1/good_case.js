var async = require('async');

async.waterfall([
    function(callback) {
        var arr1 = [];
        console.log('1. waterfall begin');
        setTimeout(function() {
            arr1.push(1);
            arr1.push(2);
            arr1.push(3);
            console.log('arr1 : ', arr1);
            callback(null, arr1);
        }, 100);
    },
    function(arg1, callback) {
        console.log('2. arg1 : ', arg1); //[1, 2, 3]
        var arr2 = [];
        console.log('3. eachSerise begin');
        async.eachSeries(arg1, function(item, cb) { //반복
            arr2.push(item * item);
            console.log('eachSeries arr2 : ', arr2);
            cb();
        }, function(err) { //eachSeries 결과
            if (err) console.log('err : ', err);
            console.log('arr2 : ', arr2);
            callback(null, arr2);
        });
    }
], function(err, result) {
    console.log("4. werterfall end result : ", result);
});