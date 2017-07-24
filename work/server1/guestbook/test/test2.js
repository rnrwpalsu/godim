var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123400',
    database: 'mserverdb'
});

pool.getConnection(function(err, conn) { // 에러객체, 연결객체
    conn.query("SELECT 1+1 AS SOLUTION", function(err, results) {
        if (err) throw err;
        console.log(results);
        console.log('The solution is: ' + results[0].solution);
        conn.release();
    });
});