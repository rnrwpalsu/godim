var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123400',
    database: 'mserverdb'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    async.waterfall([
        firstFunction,
        secondFuntion

    ], function(err, result) {
        if (err) return next(err);
        res.json(result);
    });
});

function firstFunction(callback) {
    pool.getConnection(function(err, conn) {
        if (err) return next(err);
        var sql = 'select distinct(item) from memo order by item';
        conn.query(sql, function(err, rows) {
            if (conn) conn.release();
            callback(null, rows);
        });
    });
}

function secondFuntion(arg1, callback) {
    var a = 0;
    var arr = [];
    pool.getConnection(function(err, conn) {
        async.eachSeries(arg1, function(item, cb) {
                var sql2 = "select todo from memo where item=?";
                conn.query(sql2, [item.item], function(err, rows) {
                    if (err) return next(err);
                    var memos = [];
                    for (var i = 0; i < rows.length; i++) {
                        memos[i] = rows[i].todo;
                    }
                    arr[a] = { "item": item.item, memos: memos };
                    a++;
                    cb();
                });
            },
            function(err) {
                if (err) return next(err);
                if (conn) conn.release();
                callback(null, arr);
            });
    });
}
module.exports = router;