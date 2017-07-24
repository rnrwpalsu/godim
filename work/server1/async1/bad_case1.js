//잘못된 코드
//동기방식은 ok
console.log('bad case begin');
var arr1 = [];

//비동기방식이라 밑으로 내려가버림
setTimeout(function() {
    arr1.push(1);
    arr1.push(2);
    arr1.push(3);
}, 200);

console.log('arr1 : ', arr1);

var arr2 = [];


for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log('i : ', i);
        arr2.push(i * i);
    }, 100);
}

console.log('arr2 : ', arr2);
console.log('bad case end');