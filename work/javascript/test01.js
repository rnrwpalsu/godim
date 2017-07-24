// ES6 문법 : =>

var arr = [1, 2, 3, 4, 5];

var add = function(a, b) { return a + b; }
var sum1 = arr.reduce(add);
console.log(sum1);

//ES5 코드

var sum2 = arr.reduce(function(a, b) { return a + b; });

// ES6 코그
var sum3 = arr.reduce((a, b) => { return a + b; });
var sum4 = arr.reduce((a, b) => a + b);