import { resetValidation } from "./validate.js";
import { Card } from "./Card.js";
import * as popup from "./utils.js";

// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#popup");
const addPictureForm = document.querySelector(".popup_picture");
// author, add pictures forms close buttons and popup picture close button
const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);
const overlays = Array.from(document.querySelectorAll(".popup"));
// profile form two fields
const profileFormName = document.querySelector("#popup-name");
const profileFormTitle = document.querySelector("#popup-title");
// add picture form two fields
const pictureFormPlace = document.querySelector("#popup-place");
const pictureFormURL = document.querySelector("#popup-url");
// profile display
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");
// cards and card title, card URL
const cardsContainer = document.querySelector(".cards__container");
// template element
const cardTemplate = document.querySelector("#card").content;
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  // input line error style
  inputErrorClass: "popup__info_type_error",
  // error message class
  errorClass: "popup__error_visible",
};
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
// functions to open and close the author and add picture forms
function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keyup", listenForEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keyup", listenForEsc);
}
// Three ways to close the popup:
// 1) mouseup on the close button
closePopupButtons.forEach((button) => {
  button.addEventListener("mouseup", function () {
    closePopup(button.closest(".popup"));
  });
});
// 2) mouseup on the overlay
overlays.forEach((overlay) => {
  overlay.addEventListener("mouseup", (evt) => {
    closePopup(evt.target);
  });
});
// 3) hit ESC key

function listenForEsc(evt) {
  if (evt.key === "Escape") {
    // opened overlay at the time
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}
function fillProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormTitle.value = profileTitle.textContent;
}

function handleOpenProfileForm() {
  fillProfileForm();
  resetValidation(settings, editProfileForm);
  openPopup(editProfileForm);
}
function handleOpenAddPictureForm() {
  formFieldPicture.reset();
  resetValidation(settings, addPictureForm);
  openPopup(addPictureForm);
}
//functions to handle author and add picture form results
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileTitle.textContent = profileFormTitle.value;
  closePopup(editProfileForm);
}

function handlePictureFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: pictureFormPlace.value,
    link: pictureFormURL.value,
  };
  renderCard(cardData, cardTemplate);
  closePopup(addPictureForm);
}

//buttons for author, add picture, submit buttons for both and popup trigger's event listeners
addIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editIcon.addEventListener("mouseup", handleOpenProfileForm);
formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
formFieldPicture.addEventListener("submit", handlePictureFormSubmit);
// when new card is created, render another card
(function renderCard(cardData, templateEl) {
  const card = new Card(cardData, templateEl).createCard(cardData);
  cardsContainer.prepend(card);
});
//generate all six cards and append them to the card container
initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardTemplate);
  cardsContainer.append(card.createCard(cardData));
});
