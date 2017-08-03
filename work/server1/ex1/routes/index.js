var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '모바일 서버 - test' });
});

/* 로그인 부분 */
router.get('/login', function (req, res, next) {
    res.render('loginform', {title : "로그인"});
})

router.post('/login', function(req, res, next){
    console.log('req.body : ', req.body);
    var id = req.body.id;
    var pw = req.body.pw;

    var data = {
        "status" : true,
        "result" : "ok"
    }

    res.json(data);
});

module.exports = router;
