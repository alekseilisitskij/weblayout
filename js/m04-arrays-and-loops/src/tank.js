// это функция, внутри которой нужно написать ваш код

function moveTank(roadMines) {
  let tank = 0;

  for (let i = 0; i < 10; ++i) {
    if (roadMines[i] === true) {
      tank++;
      if (tank === 1) {
        console.log('Танк поврежден');
        console.log(`Танк переместился на ${i + 1}`);
      } else if (tank === 2) {
        console.log(`Танк переместился на ${i + 1}`);
        console.log('Танк уничтожен');
        break;
      } else {
        console.log(`Танк переместился на ${i + 1}`);
      }
    } else {
      console.log(`Танк переместился на ${i + 1}`);
    }
  }
}

// вызов функции
moveTank([false, true, false, false, false, false, false, false, true, false]);
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default moveTank;
