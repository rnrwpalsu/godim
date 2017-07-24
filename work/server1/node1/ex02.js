var fs = require('fs');
//비동기 방식
fs.readFile("readme.txt", "utf-8", (err, content) => {
    if (err) return console.log(err);
    console.log("content : ", content);
});

console.log("Reading file ...");