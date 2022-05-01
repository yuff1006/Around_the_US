import "./index.css";
import Card from "../components/Card";
import { cardsContainer, cardSelector, settings } from "../utils/constants";
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
// profile section on the page
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profilePic = document.querySelector(".profile__pic");

// add picture form functions
function renderCard(inputValues) {
  const card = new Card(inputValues, cardSelector, handleCardClick);
  const cardEl = card.createCard();
  cardSection.addItem(cardEl);
}
function handlePictureFormSubmit(inputValues) {
  renderCard(inputValues);
}
const placePopup = new PopupWithForm(".popup_picture", (inputValues) => {
  fetch("https://around.nomoreparties.co/v1/group-12/cards", {
    method: "POST",
    headers: {
      authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputValues.name,
      link: inputValues.link,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      console.log("oops");
    });
  handlePictureFormSubmit(inputValues);
});

const imagePopup = new PopupWithImage("#picture-popup");
function handleCardClick(image) {
  imagePopup.open(image);
}

// initialize card Section class variable to take api call result and interact with Section.js
let cardSection;

// profile form functions
function fillProfileForm() {
  const result = userInfo.getUserInfo();
  inputProfileName.value = result.userName;
  inputProfileTitle.value = result.userJob;
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
  fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
    method: "PATCH",
    headers: {
      authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputValues.userName,
      about: inputValues.userJob,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      console.log("oops");
    });

  userInfo.setUserInfo(inputValues);
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

// render intial cards
fetch("https://around.nomoreparties.co/v1/group-12/cards", {
  headers: {
    authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
  },
})
  .then((res) => res.json())
  .then((initialCards) => {
    cardSection = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      cardsContainer
    );
    cardSection.renderItems();
  });

//  render initial user profile
fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
  headers: {
    authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
  },
})
  .then((res) => res.json())
  .then(({ name, about, avatar }) => {
    profileName.textContent = name;
    profileTitle.textContent = about;
    profilePic.src = avatar;
    profilePic.alt = `${name}'s headshot`;
  });
