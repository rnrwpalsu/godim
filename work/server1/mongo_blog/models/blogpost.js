// models / blogpost.js

var mongoose = require('mongoose');

var db = require('./db');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Comment = require('./comment');

var BlogPost = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    comments: [Comment],
    meta: {
        votes: { type: Number, default: 0 },
        favs: { type: Number, default: 0 }
    }
});

/*          주의 사항              */
/*mongoose.model이 아니라 db.model */
/*db.js를 생성하였기 때문에!        */
var BlogPostModel = db.model('BlogPost', BlogPost);

module.exports = BlogPostModel;