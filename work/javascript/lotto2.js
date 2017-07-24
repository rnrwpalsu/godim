// lotto2.js
// 난수 발생(1-45) -> 중복체크 -> 정렬

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

arr.sort((a,b) => {return a-b;});
console.log(arr);
