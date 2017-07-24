// 난수 발생(1-45) -> 중복체크 -> 정렬
// 선발된 난수합이 100보다 작고 170보다 크면 재 선출


======================================


// lotto1.js
// 1 ~ 45 볼 -> 섞어서 -> 6개 뽑기 -> 정렬



// 1-45 넣기
var arr = [];

for (var i=1; i<=45; i++){
	arr.push(i);
}

// 'ctrl + /' 주석처리
// console.log(arr);



// 섞기
arr.sort( function() {return 0.5 - Math.random(); });

// Math.random 의 난수가 0.5 - 1.0 사이로 나옴
// 0.5를 기준으로 난수정렬
// 랜덤결과에 따라 섞이는 결과가 달라짐.

console.log(arr);



// 6개 뽑기
var myballs = arr.slice(0, 6); // 6은 포함 안함, 0-5
console.log(myballs);



// 정렬
myballs.sort(function(a,b) {return a-b;});
console.log(myballs);