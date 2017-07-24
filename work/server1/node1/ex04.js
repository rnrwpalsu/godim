//비동기 방식 : 선언
function add(i, j, callback) {
    var result = i + j;
    callback(result);
}

//사용
add(1, 2, function(result) {
    console.log("result : ", result);
});