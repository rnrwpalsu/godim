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

/* GET home page. */ // function 없이 화살표(=>) 직관적???가독성???
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

/* 글쓰기 폼 */
router.get('/writeform', (req, res, next) => {
    res.render('writeform', { title: '게시판 글쓰기' }); //서버사이드 렌더링 ejs -> html
});

/* 글쓰기 완료 */
router.post('/write', (req, res, next) => {
    console.log("req.body : ", req.body);
    // 넘어온 값을 받음
    var name = req.body.name;
    var passwd = req.body.passwd;
    var title = req.body.title;
    var content = req.body.content;
    var arr = [name, passwd, title, content];

    //db insert
    pool.getConnection((err, conn) => {
        if (err) {
            return next(err);
        } //에러처리하면 알아서 해쥼
        var sql = "insert into board(name, passwd, title, content) values(?,?,?,?)";
        conn.query(sql, arr, (err, row) => {
            if (err) {
                return next(err);
            } //에러처리하면 알아서 해쥼
            //console.log("row : ", row);
            conn.release();
            res.redirect('/list'); // 리스트로 감
        });
    });
});

/* 게시판 리스트 */
router.get('/list', (req, res, next) => {
    // db에서 select해서 화면에 보여준다.
    pool.getConnection((err, conn) => {
        if (err) {
            return next(err);
        } //에러처리하면 알아서 해쥼

        var sql = "select num, name, passwd, title, content,DATE_FORMAT(regdate,'%y-%m-%d %h:%i:%s') as regdate, hit from board order by num desc";
        conn.query(sql, (err, rows) => { // s붙으면 배열
            console.log("rows : ", rows);
            var data = {
                title: "리스트",
                rows: rows
            };
            conn.release();
            res.render('list', data); //서버사이드 렌더링 ejs -> html
        });
    });

});

router.get('/read/:num', (req, res, next) => {
    //글번호를 받아와서 -> db에서 select해서 화면에 보여준다.
    var num = req.params.num;
    console.log("read num : ", num);
    pool.getConnection((err, conn) => {
        if (err) {
            return next(err);
        } //에러처리하면 알아서 해쥼


        var sqlupdate = "update board set hit = hit+1 where num=?"; //조회수 올리기
        conn.query(sqlupdate, [num], (err, row) => {
            if (err) {
                return next(err);
            }
            console.log("read update hit row : ", row);
            var sql = "select * from board where num = ?";
            conn.query(sql, [num], (err, rows) => { // s붙으면 배열
                console.log("rows : ", rows);
                if (err) {
                    return next(err);
                } //에러처리하면 알아서 해쥼
                console.log("read rows : ", rows);
                var data = {
                    title: "글읽기",
                    row: rows[0]
                };
                conn.release();
                res.render('read', data); //서버사이드 렌더링 ejs -> html
            });
        });

    });
});

router.get('/updateform/:num', (req, res, next) => {
    //글번호를 받아서 그 글번호로 select 후 수정폼을 보여준다.
    var num = req.params.num;
    console.log("updateform num : ", num);
    pool.getConnection((err, conn) => {
        if (err) {
            return next(err);
        }
        var sql = "select * from board where num=?";
        conn.query(sql, [num], (err, rows) => {
            if (err) {
                return next(err);
            }
            console.log("updateform select rows : ", num);
            var data = {
                title: "글 수정",
                row: rows[0]
            };
            conn.release();
            res.render('updateform', data);
        });
    });
});

router.post('/update', (req, res, next) => {
    // 넘어온 값을 받아서 update후 list로 이동
    console.log("update req.bpdy : ", req.body);
    var num = req.body.num;
    var name = req.body.name;
    var title = req.body.title;
    var passwd = req.body.passwd;
    var content = req.body.content;

    var sqlupdate = "update board set name=?, title=?, content=? where num=? and passwd=?";
    var arr = [name, title, content, num, passwd];

    pool.getConnection((err, conn) => {
        if (err) {
            return next(err);
        }
        conn.query(sqlupdate, arr, (err, row) => {
            if (err) {
                return next(err);
            }
            console.log("update row : ", row);
            conn.release();
            if (row.affectedRows == 1) {
                res.redirect('/list');
            } else {
                res.send('<script>alert("비밀번호가 틀렸습니다. 다시 입력해 쥬세여!");history.back();</script>');
            }
        });
    });
});

router.get('/deleteform/:num', (req, res, next) => {
    //글하나를 받아서 비밀번호 입력화면 만들기
    var num = req.params.num;
    console.log('deleteform num : ', num);
    res.render('deleteform', { title: "글삭제", num: num });
});

router.post('/delete', (req, res, next) => {
    //넘어온 값을 받아서 delete 후 list로 이동
    console.log("delete req.body : ", req.body);
    var num = req.body.num;
    var passwd = req.body.passwd;

    var sqldelete = "delete from board where num=? and passwd=?";
    pool.getConnection((err, conn) => {
        if (err) {
            return next(err);
        }
        conn.query(sqldelete, [num, passwd], (err, row) => {
            if (err) {
                return next(err);
            }
            console.log('delete row : ', row);
            conn.release();
            if (row.affectedRows == 1) {
                res.redirect('/list');
            } else {
                res.send('<script>alert("비밀번호가 틀렸습니다. 다시 입력해 쥬세여!");history.back();</script>');
            }
        });
    });

});
module.exports = router;