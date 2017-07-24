var express = require('express');
var router = express.Router();
var multer = require('multer');

//var upload = multer({
//    dest: './public/images'
//});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images');
    },
    filename: function(req, file, cb) {

        var origin = file.originalname; //qwe.pg
        var index = origin.lastIndexOf('.'); //3
        var prefix = origin.substring(0, index); //.jpg
        var suffix = origin.substring(index); //abc + 시간 + .jpg

        var uploadedName = prefix + Date.now() + suffix;
        cb(null, uploadedName);
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* 업로드 페이지로 => 이미지 1개 */
router.get('/uploadform', function(req, res, next) {
    res.render('uploadform', { title: '파일 업로드' });
});

router.post('/upload', upload.single('picture'), function(req, res, next) {
    console.log('req.body : ', req.body); // name, title, content
    console.log('req.file : ', req.file); // picture
    res.json(req.file);
});

/* 업로드 페이지로 => 이미지 여러개*/
router.get('/uploadform2', function(req, res, next) {
    res.render('uploadform2', { title: '파일 업로드2' });
});

router.post('/upload2', upload.array('photos', 12), function(req, res, next) {
    console.log('req.body : ', req.body); // name, title, content
    console.log('req.file : ', req.files); // picture
    res.json(req.files);
});

/* 업로드 페이지로 => 종류가 다른(대표/기타) 이미지 여러개*/
router.get('/uploadform3', function(req, res, next) {
    res.render('uploadform3', { title: '파일 업로드3' });
});

router.post('/upload3', upload.fields([{ name: 'leader', maxCounter: 1 }, { name: 'etcs', maxCount: 10 }]), function(req, res, next) {

    console.log('req.files ["leader"][0] : ', req.files["leader"][0]);
    console.log('req.files ["etcs"][0] : ', req.files["etcs"]);

    var data = {
        leader: req.files['leader'][0],
        etcs: req.files['etcs']
    };

    res.json(data);
});

module.exports = router;