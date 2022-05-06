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
const editProfileIcon = document.querySelector(".profile__edit-icon");
const addPictureIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#popup");
const addPictureForm = document.querySelector(".popup_picture");
const editProfilePicForm = document.querySelector(".popup_profile-pic");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");
const formFieldProfilePic = document.querySelector(
  "#form-field-profile-picture"
);
// input fields for profile form popup
const inputProfileName = document.querySelector("#popup-name");
const inputProfileTitle = document.querySelector("#popup-title");
// profile section on the page
const profilePic = document.querySelector(".profile__pic");
const editProfilePicIcon = document.querySelector(".profile__pic-edit");

// instantiate API class
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
    "Content-Type": "application/json",
  },
});

// handle Like Click function passed in as callback to Card.js
function handleLikeClick(cardId, action) {
  if (action === "remove") {
    api.removeLike(cardId);
  } else {
    api.addLike(cardId);
  }
}

// add picture form functions
function renderCard(inputValues) {
  const card = new Card(
    inputValues,
    cardSelector,
    handleCardClick,
    handleTrashButton,
    currentUserId,
    handleLikeClick
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
  avatarSelector: ".profile__pic",
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

const profilePicPopup = new PopupWithForm(
  ".popup_profile-pic",
  (inputValues) => {
    api
      .editProfilePic(inputValues)
      .then((inputValues) => {
        userInfo.setUserAvatar(inputValues);
      })
      .catch((res) => {
        console.log(res);
      });
  }
);

// validators
const addProfileFormValidator = new FormValidator(settings, editProfileForm);
addProfileFormValidator.enableValidator();
const addPictureFormValidator = new FormValidator(settings, addPictureForm);
addPictureFormValidator.enableValidator();
const editProfilePicFormValidator = new FormValidator(
  settings,
  editProfilePicForm
);
editProfilePicFormValidator.enableValidator();

function handleOpenAddPictureForm() {
  formFieldPicture.reset();

  addPictureFormValidator.resetValidation();
  placePopup.open();
}

function handleOpenEditProfilePicForm() {
  formFieldProfilePic.reset();
  editProfilePicFormValidator.resetValidation();
  profilePicPopup.open();
}
addPictureIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editProfileIcon.addEventListener("mouseup", handleOpenProfileForm);
editProfilePicIcon.addEventListener("mouseup", handleOpenEditProfilePicForm);

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
  // profilePic.src = user.avatar;
  // profilePic.alt = `${user.name}'s headshot`;
});
