let input = document.querySelector('.input');
let btn = document.querySelector('.startBtn');
let result = document.querySelector('.result');
let intervalId;
result.textContent = 30;
btn.addEventListener('click', function getValue() {
  let inputValue = parseInt(input.value);

  clearInterval(intervalId);

  intervalId = setInterval(function () {
    result.innerHTML = inputValue;
    inputValue--;

    if (inputValue === -1) {
      clearInterval(intervalId);
    }
  }, 1000);
});
