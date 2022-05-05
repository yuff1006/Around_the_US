import "./index.css";
import Card from "../components/Card";
import { cardsContainer, cardSelector, settings } from "../utils/constants";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

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
// profile section on the page
const profilePic = document.querySelector(".profile__pic");
const deleteConfirmationButton = document.querySelector("#delete-confirmation");
console.log(deleteConfirmationButton);
// instantiate API class
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
    "Content-Type": "application/json",
  },
});

// add picture form functions
function renderCard(inputValues) {
  const card = new Card(
    inputValues,
    cardSelector,
    handleCardClick,
    handleTrashButton,
    currentUserId
  );
  const cardEl = card.createCard();
  cardSection.addItem(cardEl);
}
function handlePictureFormSubmit(inputValues) {
  renderCard(inputValues);
}
// add picture form submit
const placePopup = new PopupWithForm(".popup_picture", (inputValues) => {
  api
    .addNewCard(inputValues)
    .then((inputValues) => {
      handlePictureFormSubmit(inputValues);
    })

    .catch(() => {
      console.log("oops");
    });
});

const imagePopup = new PopupWithImage("#picture-popup");
function handleCardClick(image) {
  imagePopup.open(image);
}

const deleteCardConfirmation = new PopupWithConfirmation(".popup_delete");

// to interact with the Card class, open popup, then wait for delete to complete
function handleTrashButton(card) {
  deleteCardConfirmation.setSubmit(() => {
    api.deleteCard(card.getCardId()).then(() => {
      card.deleteCard();
      deleteCardConfirmation.close();
    });
  });
  deleteCardConfirmation.open();
}

// initialize card Section class variable to take api call result and interact with Section.js
let cardSection = null;

// profile form functions
function fillProfileForm() {
  const result = userInfo.getUserInfo();
  inputProfileName.value = result.name;
  inputProfileTitle.value = result.about;
}
function handleOpenProfileForm() {
  formFieldAuthor.reset();
  fillProfileForm();
  addProfileFormValidator.resetValidation();
  profilePopup.open();
}
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
});
const profilePopup = new PopupWithForm("#popup", (inputValues) => {
  api
    .editUserProfile(inputValues)
    .then((inputValues) => {
      userInfo.setUserInfo(inputValues);
    })

    .catch((res) => {
      console.log(res);
    });
});

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

let currentUserId;
api.initialize().then(([user, cards]) => {
  currentUserId = user._id;

  cardSection = new Section(
    {
      items: cards,
      renderer: renderCard,
    },
    cardsContainer
  );
  cardSection.renderItems();

  userInfo.setUserInfo(user);
  profilePic.src = user.avatar;
  profilePic.alt = `${user.name}'s headshot`;
});
