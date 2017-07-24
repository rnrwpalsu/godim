var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test'); //데베


var Cat = mongoose.model('Cat', { name: String, age: Number });

var nabi = new Cat({ name: "나비", age: 2 });

nabi.save(function(err) {
    if (err) {
        console.log(arr);
    } else {
        console.log("저장 성공");
    }
});