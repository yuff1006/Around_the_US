class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardClick,
    handleTrashButton,
    currentUserId
  ) {
    this._imageLink = cardData.link;
    this._text = cardData.name;
    this._likes = cardData.likes.length;
    this._currentUserId = currentUserId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButton = handleTrashButton;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getCardId() {
    return this._cardId;
  }
  _setEventListeners() {
    const heartButton = this._cardElement.querySelector(".card__heart");
    heartButton.addEventListener("mouseup", (evt) => {
      this._handleLike(evt);
    });
    if (this._trashButton) {
      this._trashButton.addEventListener("mouseup", () => {
        this._handleTrashButton();
        if (this._handleTrashButton()) {
          this._deleteCard();
        }
      });
    }

    this._cardImage.addEventListener("mouseup", (evt) => {
      this._handleCardClick(evt.target);
    });
  }
  _handleLike(evt) {
    evt.target.classList.toggle("card__heart_active");
  }
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__img");
    const cardTitle = this._cardElement.querySelector(".card__place");
    const likeCount = this._cardElement.querySelector(".card__like-count");
    this._trashButton = this._cardElement.querySelector(".card__trash");
    likeCount.textContent = this._likes;
    this._cardImage.alt = this._text;
    this._cardImage.src = this._imageLink;
    cardTitle.textContent = this._text;

    if (this._ownerId !== this._currentUserId) {
      this._trashButton.remove();
      this._trashButton = null;
    }
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
