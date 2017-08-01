//데이터베이스 로그인
var mysql = require('mysql');
var async = require('async');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123400',
    database: 'mserverdb'
});

/**var write = function() {}
 * exports = write
 * 랑 같은뜻 => 게시판 글 쓰기 부분*/
exports.write = function(data, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            console.log('err : ', err);
            return callback(err);
        }
        var sql = "insert into board(name, passwd, title, content) values(?,?,?,?)";
        conn.query(sql, data, function(err, row) {
            if (err) {
                console.log('err : ', err);
                return callback(err);
            }
            var success = false;
            if (row.affectedRows == 1) {
                success = true;
                conn.release();
                callback(success);
            }
        });
    });
};

//리스트 부분
exports.list = function(callback) {
    // db에서 select해서 화면에 보여준다.
    pool.getConnection((err, conn) => {
        if (err) {
            return callback(err);
        } //에러처리

        var sql = "select num, name, passwd, title, content,DATE_FORMAT(regdate,'%y-%m-%d %h:%i:%s') as regdate, hit from board order by num desc";
        conn.query(sql, (err, rows) => { // s붙으면 배열
            if (err) return callback(err);
            console.log("rows : ", rows);
            var data = {
                title: "리스트",
                rows: rows
            };
            conn.release();
            callback(data);
            //res.render('list', data); //서버사이드 렌더링 ejs -> html
        });
    });
};

function hitUp(num, w_done) { //async.constant값이 넘어온다!
    console.log("hitup num : ", num);
    pool.getConnection(function(err, conn) {
        if (err) return w_done(err);
        var sql = "update board set hit = hit+1 where num=?"; //조회수 올리기
        conn.query(sql, [num], function(err, row) {
            if (err) return w_done(err);
            console.log('hitUp row : ', row);
            conn.release();
            w_done(null, num);
        });
    });
}

function readOne(num, w_done) {
    pool.getConnection(function(err, conn) {
        var sql = "select num, name, passwd, title, content,DATE_FORMAT(regdate,'%y-%m-%d %h:%i:%s') as regdate, hit from board where num=?";
        conn.query(sql, [num], function(err, rows) {
            if (err) return w_done(err);
            console.log('readOne row : ', rows);
            conn.release();
            var data = {
                title: "글읽기",
                row: rows[0]
            };
            w_done(null, data);
        });
    });
}

exports.read = function(num, callback) {
    async.waterfall([
        async.constant(num), // 콜백함수 첫번째값 넘긴다!!!!!!
        hitUp,
        readOne
    ], function(err, result) {
        console.log('read result : ', result);
        callback(result);
    });
};

exports.updateform = function(num, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('err', err);
            return callback(err);
        }
        var sql = "select * from board where num=?";
        conn.query(sql, [num], (err, rows) => {
            if (err) {
                console.log('err', err);
                return callback(err);
            }
            console.log("updateform select rows : ", rows);
            var data = {
                title: "글 수정",
                row: rows[0]
            };
            conn.release();
            //res.render('updateform', data);
            callback(data);
        });
    });
};

exports.update = function(arr, callback) {
    pool.getConnection((err, conn) => {
        var sqlupdate = "update board set name=?, title=?, content=? where num=? and passwd=?";
        if (err) {
            console.log('err', err);
            return callback(err);
        }
        conn.query(sqlupdate, arr, (err, row) => {
            if (err) {
                console.log('err', err);
                return callback(err);
            }
            console.log("update row : ", row);
            conn.release();
            var success = false;
            if (row.affectedRows == 1) {
                //res.redirect('/list');
                success = true;
            }
            callback(success);
        });
    });
};

exports.delete = function(arr, callback) {
    var sqldelete = "delete from board where num=? and passwd=?";
    pool.getConnection((err, conn) => {
        if (err) {
            return callback(err);
        }
        conn.query(sqldelete, arr, (err, row) => {
            if (err) {
                return next(err);
            }
            console.log('delete row : ', row);
            conn.release();
            var success = false;
            if (row.affectedRows == 1) {
                success = true;
            }
            callback(success);
        });
    });
};