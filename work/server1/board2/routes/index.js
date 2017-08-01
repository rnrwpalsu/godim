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

var db_board = require('../models/db_board');

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
    db_board.write(arr, function(success) {
        console.log('success : ', success);
        if (success) {
            //res.json({ success: success });
            res.redirect('/list');
        } else {
            res.json({ success: success });
        }
    });
});

/* 게시판 리스트 */
router.get('/list', (req, res, next) => {
    // db에서 select해서 화면에 보여준다.
    db_board.list(function(data) {
        res.render('list', data);
    });
});

router.get('/read/:num', (req, res, next) => {
    //글번호를 받아와서 -> db에서 select해서 화면에 보여준다.
    var num = req.params.num;
    console.log("read num : ", num);
    db_board.read(num, function(data) {
        res.render('read', data);
    });
});

router.get('/updateform/:num', (req, res, next) => {
    //글번호를 받아서 그 글번호로 select 후 수정폼을 보여준다.
    var num = req.params.num;
    console.log("updateform num : ", num);
    db_board.updateform(num, function(data) {
        res.render('updateform', data);
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
    var arr = [name, title, content, num, passwd];

    db_board.update(arr, function(success) {
        if (success) {
            res.redirect('/list');
        } else {
            res.send('<script>alert("비밀번호가 틀렸습니다. 다시 입력해 쥬세여!");history.back();</script>');
        }
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
    var arr = [num, passwd];

    db_board.delete(arr, function(success) {
        if (success) {
            res.redirect('/list');
        } else {
            res.send('<script>alert("비밀번호가 틀렸습니다. 다시 입력해 쥬세여!");history.back();</script>');
        }
    });
});

module.exports = router;