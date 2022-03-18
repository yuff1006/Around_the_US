import { resetValidation } from "./validate.js";

// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#popup");
const addPictureForm = document.querySelector(".popup_picture");
// author, add pictures forms close buttons and popup picture close button
const closePopupButtons = Array.from(document.querySelectorAll(".popup__close"));
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
// picture popup container, caption, picture and close container
const popupContainer = document.querySelector("#picture-popup");
const popupCaption = document.querySelector(".popup__popup-caption");
const popupPicture = document.querySelector(".popup__picture");
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
  errorClass: "popup__error_visible"
}
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
  popup.classList.add("popup_open");
  document.addEventListener("keyup", listenForEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keyup", listenForEsc);
}
// Three ways to close the popup:
// 1) mouseup on the close button
closePopupButtons.forEach((button)=> {
  button.addEventListener("mouseup", function() {
    closePopup(button.closest(".popup"));
  })
});
// 2) mouseup on the overlay
overlays.forEach((overlay)=> {
  overlay.addEventListener("mouseup", (evt)=> {
    closePopup(evt.target);
  })
});
// 3) hit ESC key
function listenForEsc() {
  document.addEventListener("keyup", function(evt) {
    if (evt.key === "Escape") {
      overlays.forEach((overlay)=> {
        if (overlay.classList.contains("popup_open")) {
          closePopup(overlay);
        }
      })
    }
  })
};

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
  resetValidation(settings, addPictureForm);
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
  heartButton.addEventListener("mouseup", handleLike);
  const trashButton = cardElement.querySelector(".card__trash");
  trashButton.addEventListener("mouseup", deleteCard);
  cardImage.addEventListener("mouseup", openPicturePopup);
  return cardElement;
}
//buttons for author, add picture, submit buttons for both and popup trigger's event listeners
addIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editIcon.addEventListener("mouseup", handleOpenProfileForm);
formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
formFieldPicture.addEventListener("submit", handlePictureFormSubmit);
//generate all six cards and append them to the card container
initialCards.map((item)=> {
  cardsContainer.append(createCard(item));
});
