// Задача 1
let password = "1234-";

if (password.length >= 4 && password.includes('-') || password.includes('_')) {
  console.log('Пароль надёжный');
} else {
  console.log('Пароль недостаточно надёжный');
}

// Задача 2
let userName = 'ivAn';
let userSurname = 'ivAnOv';

let first = userName.substring(0, 1);
let last = userName.substring(1);

let firstSurname = userSurname.substring(0, 1);
let lastSurname = userSurname.substring(1);

let big = first.toUpperCase();
let small = last.toLowerCase();

let map = firstSurname.toUpperCase();
let card = lastSurname.toLowerCase();

let numName = big + small;
let numSurname = map + card;

console.log(numName === 'Ivan' ? 'Имя было преобразовано' : 'Имя осталось без изменений');
console.log(numSurname === 'Ivanov' ? 'Имя было преобразовано' : 'Имя осталось без изменений');

// Задача 3

let number = 8;

let red = number % 2;

if (red == true) {
  console.log('Число нечетное');
} else {
  console.log('Число четное');
}


