import PopupWithImage from "./PopupWithImage";
class Card {
  constructor(cardData, cardSelector) {
    this._imageLink = cardData.link;
    this._text = cardData.name;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _setEventListeners() {
    const heartButton = this._cardElement.querySelector(".card__heart");
    heartButton.addEventListener("mouseup", (evt) => {
      this._handleLike(evt);
    });
    const trashButton = this._cardElement.querySelector(".card__trash");
    trashButton.addEventListener("mouseup", () => {
      this._deleteCard();
    });
  }
  _handleLike(evt) {
    evt.target.classList.toggle("card__heart_active");
  }
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  handleCardClick(evt) {
    const popup = new PopupWithImage("#picture-popup", evt.target);
    popup.setEventListeners();
    popup.open();
  }
  createCard(cardData) {
    this._cardElement = this._getTemplate();
    const cardImage = this._cardElement.querySelector(".card__img");
    const cardTitle = this._cardElement.querySelector(".card__place");
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    this._setEventListeners();
    cardImage.addEventListener("mouseup", (evt) => {
      this.handleCardClick(evt);
    });
    return this._cardElement;
  }
}

export default Card;
