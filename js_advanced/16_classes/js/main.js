import AmazingCard from "./amazingcard.js";

function newGame(container, imagePaths) {
  let cardsImageArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;

  for(let i = 0; i < imagePaths.length; ++i) {
    cardsImageArray.push(imagePaths[i]);
    cardsImageArray.push(imagePaths[i]);
  }

  cardsImageArray = cardsImageArray.sort(() => Math.random() - 0.5);

  // Создайте массив карт с изображениями
  for (const cardNumber of cardsImageArray) {
    cardsArray.push(new AmazingCard(container, cardNumber, flip));
  }

  function flip(card) {

    if (firstCard !== null && secondCard !== null) {
      // Обработка несовпадения карт
      if (firstCard.cardNumber !== secondCard.cardNumber) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }


    if (firstCard !== null && secondCard !== null) {
      // Обработка совпадения карт
      if (firstCard.cardNumber === secondCard.cardNumber) {
        firstCard.sucsess = true;
        secondCard.sucsess = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelectorAll('.card.sucsess').length == (imagePaths.length * 2)) {
      alert('Поздравляем');
      container.innerHTML = '';
      cardsImageArray = [];
      cardsArray = [];
      firstCard = null;
      secondCard = null;
      newGame(container, imagePaths);
    }
  }
}

let imagePaths = [
  'https://fikiwiki.com/uploads/posts/2022-02/1644723311_51-fikiwiki-com-p-tyuleni-krasivie-kartinki-58.jpg',
  'http://vsegda-pomnim.com/uploads/posts/2022-04/1651052193_3-vsegda-pomnim-com-p-morskoi-kotik-foto-3.jpg',
  'https://i.pinimg.com/originals/4f/e8/25/4fe8251892d6cb8060c5cb7479dc4ef5.jpg',
];

newGame(document.getElementById('game'), imagePaths);

