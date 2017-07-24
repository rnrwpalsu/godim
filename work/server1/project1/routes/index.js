var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
    var items = [{
            "title": "제목3",
            "date": "2017-07-05 15:31:52",
            "postId": "3"
        },
        {
            "title": "제목2",
            "date": "2017-07-05 15:27:52",
            "postId": "2"
        },
        {
            "title": "제목1",
            "date": "2017-07-05 15:15:52",
            "postId": "1"
        }
    ];
    res.json({ items: items });
});

router.get('/read/:postId', function(req, res, next) {
    var item = {
        "title": "제목3",
        "date": "2017-07-05 15:31:52",
        "postId": "3"
    };
    res.json({ item: item });
});

module.exports = router;