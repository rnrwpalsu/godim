//models/boardmodel.js
var mongoose = require('mongoose');
var db = require('./db'); // db.js
var Schema = mongoose.Schema;
//글번호 자동증가
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var BoardSchema = new Schema({
    title: String,
    content: String,
    passwd: String,
    regdate: { type: Date, default: Date.now },
    hit: { type: Number, default: 0 },
    name: String
});

BoardSchema.virtual('myregdate').get(function() {
    return formatDate(this.regdate);
});

BoardSchema.set('toJSON', { virtuals: true });

BoardSchema.plugin(autoIncrement.plugin, { model: 'Board', field: 'num', startAt: 1, incrementBy: 1 });

var Board = db.model('Board', BoardSchema);

function formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();

    //yyyy-mm-dd hh:mm:ss
    var day = y + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' + d) + ' ' +
        (h > 9 ? h : '0' + h) + ":" + (i > 9 ? i : '0' + i) + ":" + (s > 9 ? s : '0' + s);
    return day;
}