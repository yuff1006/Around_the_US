const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const cardsContainer = document.querySelector(".cards__container");
class Card {
  constructor(cardData, templateEl) {
    this._imageLink = cardData.link;
    this._text = cardData.name;
    this._cardElement = templateEl.cloneNode(true);
  }
  _setEventListeners() {
    const heartButton = this._cardElement.querySelector(".card__heart");
    heartButton.addEventListener("mouseup", this._handleLike);
    const trashButton = this._cardElement.querySelector(".card__trash");
    trashButton.addEventListener("mouseup", this._deleteCard);
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
const cardTemplate = document.querySelector("#card").content;
initialCards.map((cardData) => {
  const card = new Card(cardData, cardTemplate);
  cardsContainer.append(card.createCard(cardData));
});
