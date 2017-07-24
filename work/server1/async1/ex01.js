var async = require('async');
//작업내용을 배열[] / 오브젝트{} 형태로 사용가능

//series 사용
async.series([
        function(callback) {
            //코드 1
            console.log('코드1');
            callback(null, 'one');
        },
        function(callback) {
            //코드2
            console.log('코드2');
            //var err = new Error('코드2 에러'); 
            //callback(err);
            callback(null, 'two');
        },
        function(callback) {
            //코드3
            console.log('코드3');
            callback(null, 'three');
        }
    ],
    function(err, results) {
        //results = ['one', 'two', 'three']
        if (err) return console.log('err : ', err);
        console.log('results : ', results);
    }
);