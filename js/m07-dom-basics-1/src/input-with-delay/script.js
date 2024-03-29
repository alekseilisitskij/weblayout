let input = document.querySelector('.input');
let text = document.querySelector('.title');
let intervalId;

input.addEventListener('input', function () {
  clearInterval(intervalId);

  intervalId = setInterval(function () {
    text.textContent = input.value;
  }, 300);
});
