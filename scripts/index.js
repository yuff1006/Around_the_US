import { resetValidation } from "./validate.js";

// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#edit-form");
const addPictureForm = document.querySelector(".edit-form_picture");
// author, add pictures forms close buttons and popup picture close button
const closePopupButtons = Array.from(document.querySelectorAll(".edit-form__close"));
const overlays = Array.from(document.querySelectorAll(".edit-form"));
// profile form two fields
const profileFormName = document.querySelector("#edit-form-name");
const profileFormTitle = document.querySelector("#edit-form-title");
// add picture form two fields
const pictureFormPlace = document.querySelector("#edit-form-place");
const pictureFormURL = document.querySelector("#edit-form-url");
// profile display
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");
// cards and card title, card URL
const cardsContainer = document.querySelector(".cards__container");
// picture popup container, caption, picture and close container
const popupContainer = document.querySelector("#picture-popup");
const popupCaption = document.querySelector(".edit-form__popup-caption");
const popupPicture = document.querySelector(".edit-form__picture");
// template element
const cardTemplate = document.querySelector("#card").content;
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
// functions to open and close the author and add picture forms
function openPopup(popup) {
  popup.classList.add("edit-form_open");
}

function closePopup(popup) {
  popup.classList.remove("edit-form_open");
}
// Three ways to close the edit-form:
// 1) click on the close button
closePopupButtons.forEach((button)=> {
  button.addEventListener("click", function() {
    closePopup(button.closest(".edit-form"));
  })
});
// 2) click on the overlay
overlays.forEach((overlay)=> {
  overlay.addEventListener("click", (evt)=> {
    closePopup(evt.target);
  })
});
// 3) hit ESC key
document.addEventListener("keydown", function(evt) {
  if (evt.key === "Escape") {
    overlays.forEach((overlay)=> {
      closePopup(overlay);
    })
  }
});

function handleOpenProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormTitle.value = profileTitle.textContent;
  resetValidation(editProfileForm);
  openPopup(editProfileForm);
}
function handleOpenAddPictureForm() {
  resetValidation(addPictureForm);
  formFieldPicture.reset();
  openPopup(addPictureForm);
}
//functions to handle author and add picture form results
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileTitle.textContent = profileFormTitle.value;
  closePopup(editProfileForm);
}
function renderCard(card) {
  cardsContainer.prepend(createCard(card));
}
function handlePictureFormSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = pictureFormPlace.value;
  card.link = pictureFormURL.value;
  renderCard(card);
  closePopup(addPictureForm);
}
//functions to handle popup pictures close and open
function openPicturePopup(evt) {
  popupPicture.alt = evt.target.alt;
  popupPicture.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupContainer);
}
// interactivity for like button
function handleLike(evt) {
  evt.target.classList.toggle("card__heart_active");
}
// function to delete cards using trash icon
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}
// code for generating cards dynamically
function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__place");
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  const heartButton = cardElement.querySelector(".card__heart");
  heartButton.addEventListener("click", handleLike);
  const trashButton = cardElement.querySelector(".card__trash");
  trashButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openPicturePopup);
  return cardElement;
}
//buttons for author, add picture, submit buttons for both and popup trigger's event listeners
addIcon.addEventListener("click", handleOpenAddPictureForm);
editIcon.addEventListener("click", handleOpenProfileForm);
formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
formFieldPicture.addEventListener("submit", handlePictureFormSubmit);
//generate all six cards and append them to the card container
initialCards.map((item)=> {
  cardsContainer.append(createCard(item));
});
