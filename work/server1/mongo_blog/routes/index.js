var express = require('express');
var router = express.Router();

var BlogPostModel = require('../models/blogpost');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/blog/new', function(req, res, next) {
    res.render('blog_new', { title: 'New Post' })
});

router.post('/blog/new', function(req, res, next) {
    console.log('req.body : ', req.body);
    var data = {
        title: req.body.title,
        body: req.body.body
    };
    var blog = new BlogPostModel(data);
    blog.save(function(err, doc) {
        if (err) return next(err);
        console.log('doc : ', doc);
        res.redirect('/blog/list');
    });
});

router.get('/blog/list', function(req, res, next) {
    BlogPostModel.find({}, null, { sort: { date: -1 } }, function(err, docs) {
        if (err) return next(err);
        console.log('list docs : ', docs);
        res.render('blog_list', { title: '블로그 리스트', docs: docs }); //웹서버
        //res.json({ docs: docs }); //모바일서버
    });
});

router.get('/blog/:id', function(req, res, next) {
    var id = req.params.id;
    console.log('id : ', id);
    BlogPostModel.findOne({ _id: id }, function(err, doc) {
        console.log('read doc : ', doc);
        res.render('blog_show', { title: '블로그 읽기', doc: doc }); //웹서버
        //res.json({ id: id }); //모바일서버
    });
});

router.post('/blog/addComment', function(req, res, next) {
    console.log('req.body : ', req.body);
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var data = {
        title: title,
        body: body
    };
    //res.json({ result: "OK" }); //모바일서버
    //upsert = update + insert
    BlogPostModel.findByIdAndUpdate({ _id: id }, { $push: { "comments": data } }, { safe: true, upsert: true, new: true }, function(err, doc) {
        if (err) return next(err);
        console.log('comments update doc : ', doc);
        res.redirect('/blog/' + id);
    });
});
module.exports = router;