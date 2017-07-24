var express = require('express');
var router = express.Router();

//데이터베이스 로그인
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123400',
    database: 'mserverdb'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* 글쓰기 폼 */
router.get('/writeform', function(req, res, next) {
    res.render('writeform', { title: '방명록 글쓰기' }); //서버사이드 렌더링 ejs -> html
});

/* 글쓰기 완료 */
router.post('/write', function(req, res, next) {
    console.log("req.body : ", req.body);
    // 넘어온 값을 받음
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var arr = [name, title, content];

    //방명록 저장
    pool.getConnection(function(err, conn) {
        var sql = "insert into guestbook(name, title, content) values(?,?,?)";
        conn.query(sql, arr, function(err, row) {
            console.log("row : ", row);
            //res.send('OK');
            res.redirect('/list'); // 리스트로 감
        });
    });
});

/* 방명록 리스트 */
router.get('/list', function(req, res, next) {
    // db에서 select해서 화면에 보여준다.
    pool.getConnection(function(err, conn) {
        if (err) {
            next(err);
        } //에러처리하면 알아서 해쥼

        var sql = "select * from guestbook order by no desc";
        conn.query(sql, function(err, rows) { // s붙으면 배열
            console.log("rows : ", rows);
            var data = {
                title: "방명록 리스트입니다.",
                rows: rows
            };
            res.render('list', data); //서버사이드 렌더링 ejs -> html
        });
    });

});
module.exports = router;