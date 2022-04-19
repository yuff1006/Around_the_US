import "./index.css";
import Card from "../components/Card";
import {
  cardsContainer,
  cardSelector,
  initialCards,
  settings,
} from "../utils/constants";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";

// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#popup");
const addPictureForm = document.querySelector(".popup_picture");
// profile display
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");

function handlePictureFormSubmit(inputValues) {
  const card = new Card(inputValues, cardSelector);
  const addedCard = card.createCard();
  cards.addItem(addedCard);
}
const placePopup = new PopupWithForm(".popup_picture", (evt, inputValues) => {
  handlePictureFormSubmit(evt, inputValues);
});
placePopup.setEventListeners();

function fillProfileForm() {
  const result = newUserInfo.getUserInfo();
  document.querySelector("#popup-name").value = result.userName;
  document.querySelector("#popup-title").value = result.userJob;
}
// user info at first
const newUserInfo = new UserInfo([
  profileName.textContent,
  profileTitle.textContent,
]);

const profilePopup = new PopupWithForm("#popup", (inputValues) => {
  newUserInfo.setUserInfo(inputValues);
});
profilePopup.setEventListeners();

function handleOpenProfileForm() {
  formFieldAuthor.reset();
  fillProfileForm();
  addProfileFormValidated.resetValidation();
  profilePopup.open();
}

// validators
const addProfileFormValidated = new FormValidator(settings, editProfileForm);
addProfileFormValidated.enableValidator();
const addPictureFormValidated = new FormValidator(settings, addPictureForm);
addPictureFormValidated.enableValidator();

function handleOpenAddPictureForm() {
  formFieldPicture.reset();
  addPictureFormValidated.resetValidation();
  placePopup.open();
}

addIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editIcon.addEventListener("mouseup", handleOpenProfileForm);

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
