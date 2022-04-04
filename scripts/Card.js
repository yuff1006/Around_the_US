export class Card {
  constructor(cardData, templateEl) {
    this._imageLink = cardData.link;
    this._text = cardData.name;
    this._cardElement = templateEl.cloneNode(true);
  }
  _setEventListeners() {
    const heartButton = this._cardElement.querySelector(".card__heart");
    heartButton.addEventListener("mouseup", () => {
      this._handleLike();
    });
    const trashButton = this._cardElement.querySelector(".card__trash");
    trashButton.addEventListener("mouseup", () => {
      this._deleteCard();
    });
  }
  _handleLike(evt) {
    evt.target.classList.toggle("card__heart_active");
  }
  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  createCard(cardData) {
    const cardImage = this._cardElement.querySelector(".card__img");
    const cardTitle = this._cardElement.querySelector(".card__place");
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    this._setEventListeners();
    return this._cardElement;
  }
}
