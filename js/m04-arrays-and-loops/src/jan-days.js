// это функция, внутри которой нужно написать ваш код
// firstWeekDay будет задаваться в момент вызова функции, как в примере кода под ней
function januaryDays(firstWeekDay) {
  let weekDay = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
  let indexArray = weekDay.indexOf(firstWeekDay);

  for (let i = 0; i < 31; i++) {
    console.log(`${i + 1} января, ${weekDay[((i + indexArray) % 7)]}`);
  }
}

// выполнение кода внутри функции
januaryDays('понедельник'); // вывести все дни недели января, если 1-я января - понедельник
januaryDays('среда'); // вывести все дни недели января, если 1-я января - среда
januaryDays('воскресенье'); // вывести все дни недели января, если 1-я января - воскресенье
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default januaryDays;
