class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardClick,
    handleTrashButton,
    currentUserId,
    handleLikeClick
  ) {
    this._imageLink = cardData.link;
    this._text = cardData.name;
    this._likes = cardData.likes;
    this._currentUserId = currentUserId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButton = handleTrashButton;
    this._handleLikeClick = handleLikeClick;
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
    this._heartButton.addEventListener("mouseup", (evt) => {
      if (this._heartButton.classList.contains("card__heart_active")) {
        this._handleLikeClick(this._cardId, "remove");
        this._likeCount.textContent--;
      } else {
        this._handleLikeClick(this._cardId, "add");
        this._likeCount.textContent++;
      }
      this._handleLike(evt.target);
    });
    if (this._trashButton) {
      this._trashButton.addEventListener("mouseup", () => {
        this._handleTrashButton(this);
      });
    }

    this._cardImage.addEventListener("mouseup", (evt) => {
      this._handleCardClick(evt.target);
    });
  }
  _handleLike(element) {
    element.classList.toggle("card__heart_active");
  }
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__img");
    const cardTitle = this._cardElement.querySelector(".card__place");
    this._likeCount = this._cardElement.querySelector(".card__like-count");
    this._trashButton = this._cardElement.querySelector(".card__trash");
    this._heartButton = this._cardElement.querySelector(".card__heart");
    this._likeCount.textContent = this._likes.length;
    this._cardImage.alt = this._text;
    this._cardImage.src = this._imageLink;
    cardTitle.textContent = this._text;

    if (this._ownerId !== this._currentUserId) {
      this._trashButton.remove();
      this._trashButton = null;
    }
    this._setEventListeners();

    this._likes.forEach((user) => {
      if (user._id === this._currentUserId) {
        this._handleLike(this._heartButton);
      }
    });
    return this._cardElement;
  }
}

export default Card;
