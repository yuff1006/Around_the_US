import "./index.css";
import headerLogo from "../images/header__logo.svg";
import profilePic from "../images/profile__pic.jpg";
import Card from "../components/Card.js";
import {
  cardsContainer,
  cardSelector,
  openPopup,
} from "../components/utils.js";
import { initialCards, settings } from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";

//picture sources
document.querySelector(".header__logo").src = headerLogo;
document.querySelector(".profile__pic").src = profilePic;
// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#popup");
const addPictureForm = document.querySelector(".popup_picture");

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
// for testing//
////////////////
import PopupWithForm from "../components/PopupWithForm";
const newPop = new PopupWithForm("#popup", "haha");
newPop.setEventListeners();
///////////////
function fillProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormTitle.value = profileTitle.textContent;
}
const addProfileFormValidated = new FormValidator(settings, editProfileForm);
addProfileFormValidated.enableValidator();
function handleOpenProfileForm() {
  fillProfileForm();
  addProfileFormValidated.resetValidation();
  openPopup(editProfileForm);
}
const addPictureFormValidated = new FormValidator(settings, addPictureForm);
addPictureFormValidated.enableValidator();
function handleOpenAddPictureForm() {
  formFieldPicture.reset();
  addPictureFormValidated.resetValidation();
  openPopup(addPictureForm);
}
//functions to handle author and add picture form results
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileTitle.textContent = profileFormTitle.value;
  closePopup(editProfileForm);
}

// function handlePictureFormSubmit(evt) {
//   evt.preventDefault();
//   const cardData = {
//     name: pictureFormPlace.value,
//     link: pictureFormURL.value,
//   };
//   renderCard(cardData, cardSelector);
//   closePopup(addPictureForm);
// }
// when new card is created, render another card
function renderCard(cardData, cardSelector) {
  const renderedCard = new Card(cardData, cardSelector).createCard(cardData);
  cardsContainer.prepend(renderedCard);
}

//buttons for author, add picture, submit buttons for both and popup trigger's event listeners
addIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editIcon.addEventListener("mouseup", handleOpenProfileForm);
formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
// formFieldPicture.addEventListener("submit", handlePictureFormSubmit);
//generate all six cards and append them to the card container

initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardSelector);
  cardsContainer.append(card.createCard(cardData));
});
