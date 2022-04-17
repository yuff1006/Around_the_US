import "./index.css";
import headerLogo from "../images/header__logo.svg";
import profilePic from "../images/profile__pic.jpg";
import Card from "../components/Card";
import {
  cardsContainer,
  cardSelector,
  openPopup,
} from "../components/utils.js";
import { initialCards, settings } from "../components/constants";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
//picture sources
document.querySelector(".header__logo").src = headerLogo;
document.querySelector(".profile__pic").src = profilePic;
// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#popup");
const addPictureForm = document.querySelector(".popup_picture");
// profile display
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
// profile form two fields
const profileFormName = document.querySelector("#popup-name");
const profileFormTitle = document.querySelector("#popup-title");
// add picture form two fields
const pictureFormPlace = document.querySelector("#popup-place");
const pictureFormURL = document.querySelector("#popup-url");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//functions to handle author and add picture form results
// function handleProfileFormSubmit(evt, inputValues) {
//   evt.preventDefault();
//   profileName.textContent = inputValues[0];
//   profileTitle.textContent = inputValues[1];
// }

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function handlePictureFormSubmit(evt, inputValues) {
  evt.preventDefault();
  const card = new Card(
    { link: inputValues[1], name: inputValues[0] },
    cardSelector
  );
  const addedCard = card.createCard();
  cards.addItem(addedCard);
}
const placePopup = new PopupWithForm(".popup_picture", (evt, inputValues) => {
  handlePictureFormSubmit(evt, inputValues);
});
placePopup.setEventListeners();
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function fillProfileForm() {
  console.log("filled" + profileName.textContent + profileTitle.textContent);
  profileFormName.value = profileName.textContent;
  profileFormTitle.value = profileTitle.textContent;
}

function handleOpenProfileForm() {
  const addProfileFormValidated = new FormValidator(settings, editProfileForm);
  addProfileFormValidated.enableValidator();
  // create a new popup with form
  const profilePopup = new PopupWithForm("#popup", (inputValues) => {
    // handleFormSubmit function:
    const newUserInfo = new UserInfo(inputValues);
    console.log(newUserInfo.getUserInfo());
    newUserInfo.setUserInfo();
    // handleProfileFormSubmit(evt, inputValues);
    addProfileFormValidated.resetValidation();
  });
  //need to populate the form with existing user info data
  fillProfileForm();

  profilePopup.open();
  profilePopup.setEventListeners();
  // fillProfileForm();
}
const addPictureFormValidated = new FormValidator(settings, addPictureForm);
addPictureFormValidated.enableValidator();
function handleOpenAddPictureForm() {
  formFieldPicture.reset();
  addPictureFormValidated.resetValidation();
  openPopup(addPictureForm);
}

// when new card is created, render another card
// function renderCard(cardData, cardSelector) {
//   const renderedCard = new Card(cardData, cardSelector).createCard(cardData);
//   cardsContainer.prepend(renderedCard);
// }

//buttons for author, add picture, submit buttons for both and popup trigger's event listeners
addIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editIcon.addEventListener("mouseup", handleOpenProfileForm);
// formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
// formFieldPicture.addEventListener("submit", handlePictureFormSubmit);

const cards = new Section(
  {
    items: initialCards,
    renderer: (cardEl) => {
      const card = new Card(cardEl, cardSelector);
      const cardContent = card.createCard();
      cards.addItem(cardContent);
    },
  },
  cardsContainer
);
cards.renderItems();
