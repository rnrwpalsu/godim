var gm = require('gm');

var srcFile = "pika.jpg";
var destFile = "pika_thumnail.jpg";

gm(srcFile).resize(270).autoOrient().write(destFile, function(err) {
    if (err) console.log("err", err);
    else console.log("OK");
});