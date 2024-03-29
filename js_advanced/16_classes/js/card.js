export default class Card {
  _open = false;
  _sucsess = false;
  // _defaultImage = 'https://i.stack.imgur.com/4Onnf.png'; // Указал URL для дефолтного изображения

  constructor(container, cardNumber, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.cardNumber = cardNumber;

    // this.imgElement = document.createElement('img');
    // this.imgElement.classList.add('visibility')
    // this.imgElement.src = cardNumber;
    // this.imgElement.onerror = this.handleImageError.bind(this); // Устанавил обработчик onerror

    this.card.addEventListener('click', () => {
      if (this.open === false && this.sucsess === false) {
        this.open = true;
        action(this);
      }
    });

    // this.card.append(this.imgElement);
    container.append(this.card);
  }

  // handleImageError() {
  //   console.log('Изображение не загружено. Установилось дефолтное изображение.');
  //   this.imgElement.src = this._defaultImage;
  // }

  set open(value) {
    this._open = value;
    if (value) {
      this.card.classList.add('open');
      this.imgElement.classList.add('open');
    } else {
      this.card.classList.remove('open');
      this.imgElement.classList.remove('open');
    }
  }

  get open() {
    return this._open;
  }

  set sucsess(value) {
    this._sucsess = value;
    if (value) {
      this.card.classList.add('sucsess');
    } else {
      this.card.classList.remove('sucsess');
    }
  }

  get sucsess() {
    return this._sucsess;
  }
}

