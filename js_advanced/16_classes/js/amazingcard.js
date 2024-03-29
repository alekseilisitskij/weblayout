import Card from "./card.js";

export default class AmazingCard extends Card {
  _defaultImage = 'https://i.stack.imgur.com/4Onnf.png'; // Указал URL для дефолтного изображения
  constructor(container, cardImg, flip) {
    super(container, cardImg, flip);
    this.imgElement = document.createElement('img');
    this.imgElement.classList.add('visibility');
    this._cardImg = cardImg;
    this.imgElement.src = this._cardImg;
    this.imgElement.onerror = this.handleImageError.bind(this); // Устанавил обработчик onerror

    this.card.innerHTML = '';
    this.card.append(this.imgElement);
    this._cardImg = cardImg;
  }

  handleImageError() {
  console.log('Изображение не загружено. Установилось дефолтное изображение.');
  this.imgElement.src = this._defaultImage;
}

  set cardImg(value) {
    this._cardImg = value;
    const imagePath = value;
    this.imgElement.src = imagePath;
  }

  get cardImg() {
    return this._cardImg;
  }
}
