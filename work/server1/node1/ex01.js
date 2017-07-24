var fs = require('fs');
//동기방식
var content = fs.readFileSync("readme.txt", "utf-8");
console.log("content : ", content);
console.log("Reading file ...");