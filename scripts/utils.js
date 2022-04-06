import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
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
export const cardsContainer = document.querySelector(".cards__container");
export const cardSelector = document
  .querySelector("#card")
  .content.querySelector(".card");
// template element

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

//functions to handle popup pictures close and open

// functions to open and close the author and add picture forms
export function openPopup(popup) {
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
  const addProfileFormValidated = new FormValidator(settings, editProfileForm);
  addProfileFormValidated.enableValidator();
  openPopup(editProfileForm);
}
function handleOpenAddPictureForm() {
  formFieldPicture.reset();
  const addPictureFormValidated = new FormValidator(settings, addPictureForm);
  addPictureFormValidated.enableValidator();
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
  renderCard(cardData, cardSelector);
  closePopup(addPictureForm);
}

//buttons for author, add picture, submit buttons for both and popup trigger's event listeners
addIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editIcon.addEventListener("mouseup", handleOpenProfileForm);
formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
formFieldPicture.addEventListener("submit", handlePictureFormSubmit);

// when new card is created, render another card
function renderCard(cardData, cardSelector) {
  const renderedCard = new Card(cardData, cardSelector).createCard(cardData);
  cardsContainer.prepend(renderedCard);
}
