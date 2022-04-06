import { openPopup } from "./utils.js";
// picture popup container, caption, picture and close container
const popupContainer = document.querySelector("#picture-popup");
const popupCaption = document.querySelector(".popup__popup-caption");
const popupPicture = document.querySelector(".popup__picture");

class Card {
  constructor(cardData, cardSelector) {
    this._imageLink = cardData.link;
    this._text = cardData.name;
    this._cardElement = cardSelector.cloneNode(true);
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

  createCard(cardData) {
    const cardImage = this._cardElement.querySelector(".card__img");
    const cardTitle = this._cardElement.querySelector(".card__place");
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    this._setEventListeners();
    cardImage.addEventListener("mouseup", (evt) => {
      this._openPicturePopup(evt);
    });
    return this._cardElement;
  }
  _openPicturePopup(evt) {
    popupPicture.alt = evt.target.alt;
    popupPicture.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupContainer);
  }
}

export default Card;
