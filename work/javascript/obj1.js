//obj1.js
//생성자 함수 기반
//첫 글자 대문자
function Student(n, a, p){
    this.name = n;
    this.age = a;
    this.phone = p;

    this.toString = function() {
        return '{ name : ' + this.name + ', age : ' + this.age + ", phone : " + this.phone +"}";

    }

}

    var student1 = new Student("홍길동", 20, "010-3456-7890");
    var student2 = new Student("이순신", 40, "010-2121-4545");

    console.log(student1.toString());
    console.log(student2.toString());