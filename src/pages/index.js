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
import PopupWithImage from "../components/PopupWithImage";

// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#popup");
const addPictureForm = document.querySelector(".popup_picture");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");
// input fields for profile form popup
const inputProfileName = document.querySelector("#popup-name");
const inputProfileTitle = document.querySelector("#popup-title");

// add picture form functions
function renderCard(inputValues) {
  const card = new Card(inputValues, cardSelector, handleCardClick);
  const cardEl = card.createCard();
  cardSection.addItem(cardEl);
}
const placePopup = new PopupWithForm(".popup_picture", (evt, inputValues) => {
  handlePictureFormSubmit(evt, inputValues);
});
function handlePictureFormSubmit(inputValues) {
  renderCard(inputValues);
}
const imagePopup = new PopupWithImage("#picture-popup");
function handleCardClick(image) {
  imagePopup.open(image);
}

// profile form functions
function fillProfileForm() {
  const result = userInfo.getUserInfo();
  inputProfileName.value = result.userName;
  inputProfileTitle.value = result.userJob;
}
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
});
const profilePopup = new PopupWithForm("#popup", (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
function handleOpenProfileForm() {
  formFieldAuthor.reset();
  fillProfileForm();
  addProfileFormValidator.resetValidation();
  profilePopup.open();
}

// validators
const addProfileFormValidator = new FormValidator(settings, editProfileForm);
addProfileFormValidator.enableValidator();
const addPictureFormValidator = new FormValidator(settings, addPictureForm);
addPictureFormValidator.enableValidator();

function handleOpenAddPictureForm() {
  formFieldPicture.reset();
  addPictureFormValidator.resetValidation();
  placePopup.open();
}

addIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editIcon.addEventListener("mouseup", handleOpenProfileForm);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardEl) => {
      renderCard(cardEl);
    },
  },
  cardsContainer
);
cardSection.renderItems();
