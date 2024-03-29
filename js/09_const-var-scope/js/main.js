import Card from "./card.js";

function newGame(container, cardsCount){
 let cardsNumberArray = [],
     cardArray = [],
     firstCard = null,
     secondCard = null

  for(let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  for(const cardNumber of cardsNumberArray){
    cardArray.push(new Card(container, cardNumber, flip))
  }

  function flip(card){
    if(firstCard !== null && secondCard !== null){
      if(firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }

    if(firstCard == null) {
      firstCard = card
    } else {
      if(secondCard == null) {
        secondCard = card
      }
    }

    if(firstCard !== null && secondCard !== null){
      if(firstCard.number == secondCard.number) {
        firstCard.sucsess = true
        secondCard.sucsess = true
        firstCard = null
        secondCard = null
      }
    }

    if(document.querySelectorAll('.card.sucsess').length == cardsNumberArray.length) {
      alert('Поздравляем')
      container.innerHTML = ''
      cardsNumberArray = []
      cardArray = []
      firstCard = null
      secondCard = null
      newGame(container, cardsCount)
    }

  }
}

newGame(document.getElementById('game'), 8)
