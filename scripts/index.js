const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
const editForm = document.querySelector("#edit-form");
const pictureForm = document.querySelector(".edit-form_picture");
const closeButton = document.querySelector("#edit-form-close-author");
const closeButtonPicture = document.querySelector("#edit-form-close-picture")
const formName = document.querySelector("#edit-form-name");
const formTitle = document.querySelector("#edit-form-title");
const formPlace = document.querySelector("#edit-form-place");
const formUrl = document.querySelector("#edit-form-url");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");
const cardsContainer = document.querySelector(".cards__container");
const pictureTitle = document.querySelector("#edit-form-title");
const pictureUrl = document.querySelector("#edit-form-url");
const popupPictureClose = document.querySelector(".edit-form__close_picture");
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function openPopup(form) {
  form.classList.add("edit-form_open");
  form.style.transition = "visibility 0s, opacity 0.5s linear";
}

function closePopup(form) {
  form.classList.remove("edit-form_open");
  form.style.transition = "opacity ease-out 0.5s, visibility 0s ease-out 0.5s";

}

function handleOpenForm(evt) {
  if (evt.target.id === "edit-icon") {
    formName.value = profileName.textContent;
    formTitle.value = profileTitle.textContent;
    openPopup(editForm);
  }
  else if (evt.target.id === "add-icon") {
    openPopup(pictureForm);
  }
}

function handleCloseForm(evt) {
  if (evt.target.id === "edit-form-close-picture") {
    closePopup(pictureForm);
  }
  else if (evt.target.id === "edit-form-close-author") {
    closePopup(editForm);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileTitle.textContent = formTitle.value;
  closePopup(editForm);
}

function handlePictureFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = formPlace.value;
  newCard.link = formUrl.value;
  cardsContainer.prepend(createCard(newCard));
  closePopup(pictureForm);
}
function picturePopupClose() {
  const popupContainer = document.querySelector("#picture-popup");
  closePopup(popupContainer);
}

addIcon.addEventListener("click", handleOpenForm);
editIcon.addEventListener("click", handleOpenForm);
closeButton.addEventListener("click", handleCloseForm);
closeButtonPicture.addEventListener("click", handleCloseForm);
formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
formFieldPicture.addEventListener("submit", handlePictureFormSubmit);
popupPictureClose.addEventListener("click", picturePopupClose);

// code for generating cards dynamically
function createCard(item) {
  function heart(evt) {
    evt.target.classList.toggle("card__heart_active");
  }
  function deleteCard(evt) {
    evt.target.closest(".card").remove();
  }
  function picturePopup(evt) {
    const popupContainer = document.querySelector("#picture-popup");
    openPopup(popupContainer);
    const popupPicture = document.createElement("img");
    popupPicture.alt = evt.target.alt;
    popupPicture.src = evt.target.src;
    popupCaption.textContent = item.name;
    popupPicture.classList.add("edit-form__picture");
    popupCloseAndPicture = document.querySelector(".edit-form__close-and-picture");
    if (popupCloseAndPicture.children.length > 2) {
      popupCloseAndPicture.querySelector(".edit-form__picture").remove();
    }
    popupCloseAndPicture.prepend(popupPicture);
  }
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__place");
  const popupCaption = document.querySelector(".edit-form__popup-caption");
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  const heartButton = cardElement.querySelector(".card__heart");
  heartButton.addEventListener("click", heart);
  const trashButton = cardElement.querySelector(".card__trash");
  trashButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", picturePopup);
  return cardElement;
}
initialCards.map(function(item) {
  const card = createCard(item);
  cardsContainer.append(card);
});


