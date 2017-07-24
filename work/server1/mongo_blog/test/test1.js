//test/ test1.js
var BlogPostModel = require('../models/blogpost');
var post = new BlogPostModel({
    title: "제목1",
    body: "내용1"
});

post.comments.push({ title: "댓글1", body: "올ㅋ*1" });
post.comments.push({ title: "댓글2", body: "올ㅋ*2" });

post.save(function(err, doc) {
    if (err) return console.log('err : ', err);
    console.log('doc : ', doc);
});