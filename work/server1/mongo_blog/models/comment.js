//models/comment.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Comment = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now }
});

// 내보내기
module.exports = Comment;