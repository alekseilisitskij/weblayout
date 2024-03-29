// Первая задача
let x1 = 2;
let x2 = 10;
let y1 = 3;
let y2 = 5;
let dot1 = Math.abs(x1 - x2);
let dot2 = Math.abs(y1 - y2);
let result = dot1 * dot2;
console.log(result);

// Вторая задача
let a = 13.890123;
let b =   2.891564;
let c = 3;

let first = Math.round(a % 1 * Math.pow(10, c));
let second = Math.round(b % 1 * Math.pow(10, c));

console.log(first);
console.log(second);
console.log(first === second);
console.log(first > second);
console.log(first < second);
console.log(first >= second);
console.log(first <= second);
console.log(first !== second);

// Третья задача

let n = -3;
let m = -10;

let range = Math.abs(m-n);
let numberInRange = Math.round(Math.random() * range);
let min = Math.min(n,m);
let max = Math.max(n,m);
let resultFirst = min + numberInRange;
let resultSecond = max - numberInRange;

console.log(resultFirst);
console.log(resultSecond);
console.log(resultFirst === resultSecond);
console.log(resultFirst > resultSecond);
console.log(resultFirst < resultSecond);
console.log(resultFirst >= resultSecond);
console.log(resultFirst <= resultSecond);
console.log(resultFirst !== resultSecond);
