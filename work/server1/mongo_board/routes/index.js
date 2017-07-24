var express = require('express');
var router = express.Router();

var db = require('../models/db'); //db.js 불러오기
require('../models/boardmodel'); // boardmode.js

var BoardModel = db.model('Board');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Mongo Board' });
});

router.get('/write', function(req, res, next) {
    res.render('writeform', { title: '글쓰기' });
});

router.post('/write', function(req, res, next) {
    // 넘어온 값을 받음
    var name = req.body.name;
    var passwd = req.body.passwd;
    var title = req.body.title;
    var content = req.body.content;

    // 값을 저장
    var data = {
        title: title,
        content: content,
        name: name,
        passwd: passwd
    };

    var board = new BoardModel(data);
    board.save(function(err, doc) {
        if (err) return next(err);
        res.redirect('/list/1');
    });

    //res.send("ok");
});

/* 게시판 리스트 */
router.get('/list', (req, res, next) => {
    res.redirect('/list/1');
});

/* 게시판 리스트 */
router.get('/list/:page', (req, res, next) => {
    var page = req.params.page;
    page = parseInt(page, 10);
    BoardModel.count(function(err, cnt) {
        if (err) return next(err);
        var size = 10; // 한페이지에 10개씩 보여준다.
        var begin = (page - 1) * size; // 인덱스라서 0부터 사용
        //var end = begin + (size - 1); // 11+9 = 20 
        var totalPage = Math.ceil(cnt / size); // ceil은 올림
        var linkSize = 10; // 링크 갯수 10개
        var startPage = Math.floor((page - 1) / linkSize) * linkSize + 1; //페이지별로 넘어가는 부분
        //1의 자리를 버리고 1을 더함
        var endPage = startPage + (linkSize - 1);
        if (endPage > totalPage) {
            endPage = totalPage;
        }

        var max = cnt - ((page - 1) * size); // 현재 페이지의 가장 큰값
        BoardModel.find({}).sort('-num').skip(begin).limit(size).exec(function(err, docs) {
            if (err) return next(err);
            var datas = {
                title: "리스트",
                docs: docs,
                page: page,
                linkSize: linkSize,
                startPage: startPage,
                endPage: endPage,
                totalPage: totalPage,
                max: max
            };
            res.render('list', datas); //서버사이드 렌더링 ejs -> html
            //res.json(datas) 모바일 서버
        }); // -붙으면 내림차순 exec 실행
    });
});

/* 게시판 테스트를 위한 300개의 더미데이터 생성 */
router.get('/write300', (req, res, next) => {
    for (var i = 1; i <= 300; i++) {
        var board = new BoardModel({
            title: "제목" + i,
            content: "내용" + i,
            passwd: "1234",
            name: "홍길동" + i
        });
        board.save();
    }
    res.send('<script>alert("300개의 글이 저장 되었습니다!");location.href="/list/1";</script>');
});

/* 글 읽는 페이지 */
router.get('/read/:page/:num', (req, res, next) => {
    var page = req.params.page;
    var num = req.params.num;
    console.log("page : ", page, "num : ", num);
    //조회수를 1증가시키고 글을 하나 읽는다.
    //문서형 데베이므로 doc로 사용한다
    BoardModel.update({ num: num }, { $inc: { hit: 1 } }, (err, doc) => {
        if (err) return next(err);
        BoardModel.find({ num: num }, (err, docs) => {
            res.render('read', { title: '글 읽기', doc: docs[0], page: page });
        });
    });
});

/* 수정을 위한 페이지 */
router.get('/update/:page/:num', (req, res, next) => {
    var page = req.params.page;
    var num = req.params.num;
    BoardModel.findOne({ num: num }, (err, doc) => {
        if (err) return next(err);
        console.log('update doc : ', doc);
        res.render('updateform', { title: '글 수정', doc: doc, page: page });
    });
});

/* 글 수정 */
router.post('/update', function(req, res, next) {
    // 넘어온 값을 받음
    var page = req.body.page;
    var num = req.body.num;
    var title = req.body.title;
    var content = req.body.content;
    var name = req.body.name;
    var passwd = req.body.passwd;

    // 값을 저장
    var data = {
        title: title,
        content: content,
        name: name,
    };

    BoardModel.update({ num: num, passwd: passwd }, data, function(err, doc) {
        if (err) return next(err);
        if (doc.n == 1) {
            res.redirect('/list/' + page);
        } else {
            res.send('<script>alert("비밀번호 틀림");history.back();</script>');
        }
    });
});

router.post('/delete', function(req, res, next) {
    //글번호와 비밀번호를 받아서 삭제. 원래 페이지로 이동
    var page = req.body.page;
    var num = req.body.num;
    var passwd = req.body.passwd;


    BoardModel.remove({ num: num, passwd: passwd }, (err, doc) => {
        if (err) return next(err);
        if (doc.result.n == 1) {
            res.redirect('/list/' + page);
        } else {
            res.send('<script>alert("비밀번호 틀림");history.back();</script>');
        }
    });
    //res.send("ok");
});
module.exports = router;