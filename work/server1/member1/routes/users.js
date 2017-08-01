var express = require('express');
var router = express.Router();
var UserModel = require('../models/users')

/* GET users listing. */
//http://localhost:300/users/
router.get('/', function(req, res, next) {
    var user_id = req.session.user_id;
    console.log("user_id : ", user_id);
    res.render('users/index', { title: "회원관리", user_id: user_id });
});

router.get('/login', function(req, res, next) {
    res.render('users/loginform', { title: "로그인 폼" });
});

router.post('/login', function(req, res, next) {
    console.log('req.body : ', req.body);
    var id = req.body.id;
    var pw = req.body.pw;

    UserModel.findOne({ user_id: id, user_pw: pw, del_yn: 'N' }, function(err, doc) {
        if (err) console.log('err : ', err);
        console.log(" login doc : ", doc);
        //res.json({ doc: doc }); // 실패하면 null
        if (doc) {
            req.session.user_id = id;
            res.send('<script>alert("로그인 되었습니다.");location.href="/users/"</script>');
        } else {
            res.send('<script>alert("id나 비밀번호가 틀려서 되돌아 갑니다.");history.back();</script>');
        }
    });
});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) return console.log('err', err);
        console.log('logout req.session : ', req.session);
        res.send('<script>alert("로그아웃 되었습니다.");location.href="/users/"</script>');
    });
});

//로그인 사용자만 올 수 있는 페이지
router.get('/imsi', function(req, res, next) {
    var user_id = req.session.user_id;
    if (user_id) {
        res.send("서비스를 이용하실 수 있습니다.");
    } else {
        res.send('<script>alert("로그인을 먼저 해주세요.");location.href="/users/"</script>');
    }
});

router.get('/join', function(req, res, next) {
    res.render('users/joinform', { title: "회원가입" });
});

router.post('/join', function(req, res, next) {
    console.log('req.body : ', req.body);
    var user_id = req.body.id;
    var user_pw = req.body.pw;
    var user_email = req.body.email;
    UserModel.findOne({ user_id: user_id, del_yn: "N" }, function(err, doc) {
        if (err) console.log('join err : ', err);
        console.log('post join doc : ', doc);
        if (doc) {
            return res.send('<script>alert("이미 존재하는 id입니다.");location.href="/users/join"</script>');
        } else {
            var data = {
                user_id: user_id,
                user_pw: user_pw,
                user_email: user_email
            };

            var user = new UserModel(data);
            user.save(function(err, doc) {
                console.log('doc : ', doc);
                res.redirect('/users/login');
            });
        }
    });
});

router.get('/update', function(req, res, next) {
    var user_id = req.session.user_id;
    if (user_id) {
        UserModel.findOne({ user_id: user_id }, function(err, doc) {
            if (err) console.log('get update err : ', err);
            console.log('get update doc : ', doc);
            res.render('users/updateform', { title: "회원정보수정", doc: doc });
        });

    } else {
        res.send('<script>alert("로그인을 먼저 해주세요.");location.href="/users/"</script>');
    }
});

router.post('/update', function(req, res, next) {
    console.log('req.body : ', req.body);
    const user_id = req.body.id;
    const user_pw = req.body.pw;
    const user_email = req.body.email;

    UserModel.update({ user_id: user_id, user_pw: user_pw }, { user_email: user_email }, function(err, doc) {
        if (err) console.log('err', err);
        console.log("update doc : ", doc);
        if (doc.n == 1) {
            res.redirect('/users/');
        } else {
            res.send('<script>alert("id나 비밀번호가 틀려서 되돌아 갑니다.");history.back();</script>');
        }

    });
});

router.get('/delete', function(req, res, next) {
    if (!req.session.user_id) {
        return res.send('<script>alert("로그인을 먼저 해주세요.");location.href="/users/"</script>');
    }
    res.render('users/deleteform', { title: "회원탈퇴" });
});

router.post('/delete', function(req, res, next) {
    console.log('req.body : ', req.body);
    var user_id = req.session.user_id;
    var user_pw = req.body.pw;

    UserModel.update({ user_id: user_id, user_pw: user_pw }, { del_yn: "Y" }, function(err, doc) {
        if (err) console.log('post delete err : ', err);
        console.log('post delete doc : ', doc);
        if (doc.n == 1) {
            req.session.destroy(function(err) {
                if (err) return console.log('err', err);
                res.send('<script>alert("탈퇴 완료!");location.href="/users/"</script>');
            });
        } else {
            res.send('<script>alert("id나 비밀번호가 틀려서 되돌아 갑니다.");history.back();</script>');
        }
    });
});
module.exports = router;