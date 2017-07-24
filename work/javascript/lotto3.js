//lotto3.js
function lottoGen(){
    var arr = [];

    // 처음, 세번째 인자를 생략하면 while 문
    for(; arr.length < 6; ){
	var num = Math.floor(Math.random() * 45) + 1;
	// 0-44 까지의 수가 나오기 때문에 + 1

	    // arr.indexOf(value) value 가 없는 지를 찾아보고 false일 경우 -1 반환
	    // Array에 있는 메소드를 다 알아야 함!!!
	    if(arr.indexOf(num) == -1) {
		    arr.push(num);
	    }
    }
    arr.sort(function(a, b){return a-b});
    return arr;
}

// 합계 100~170 인 것만 5게임

var count = 0;
while(count < 5){
    var arr = lottoGen();
    var sum = arr.reduce(function(a, b){ return a + b;});
    if(sum >= 100 && sum <= 170){
        console.log("성공",arr);
        count++
    }
    else{
        console.log("실패",arr);
    }
}