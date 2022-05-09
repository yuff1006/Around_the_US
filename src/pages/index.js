import "./index.css";
import Card from "../components/Card";
import { cardsContainer, cardSelector, settings } from "../utils/constants";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Api from "../utils/Api";
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
// input fields for profile form popup
const inputProfileName = document.querySelector("#popup-name");
const inputProfileTitle = document.querySelector("#popup-title");
// profile section on the page
const profilePicInput = document.querySelector("#popup-profile-pic-url");
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
function handleLikeClick(cardId, action, card) {
  if (action === "remove") {
    api
      .removeLike(cardId)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((res) => {
        alert(res);
      });
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((res) => {
        alert(res);
      });
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
  placePopup.renderLoading(true, "Creating...");
  api
    .addNewCard(inputValues)
    .then((inputValues) => {
      handlePictureFormSubmit(inputValues);
      placePopup.close();
    })
    .catch((res) => {
      alert(res);
    })
    .finally(() => {
      placePopup.renderLoading(false, "Creating...");
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
    deleteCardConfirmation.renderLoading(true, "Saving...");
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        deleteCardConfirmation.close();
      })
      .catch((res) => {
        alert(res);
      })
      .finally(() => {
        deleteCardConfirmation.renderLoading(false, "Saving...");
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
const profilePopup = new PopupWithForm("#popup", (inputValues, button) => {
  profilePopup.renderLoading(true, "Saving");
  api
    .editUserProfile(inputValues)
    .then((inputValues) => {
      userInfo.setUserInfo(inputValues);
      console.log("closed");
    })
    .catch((res) => {
      alert(res);
    })
    .finally(() => {
      profilePopup.renderLoading(false, "Saving");
    });
});

const profilePicPopup = new PopupWithForm(
  ".popup_profile-pic",
  (inputValues, button) => {
    profilePicPopup.renderLoading(true, "Saving...");
    api
      .editProfilePic(inputValues)
      .then((inputValues) => {
        userInfo.setUserAvatar(inputValues);
      })
      .catch((res) => {
        alert(res);
      })
      .finally(() => {
        profilePicPopup.renderLoading(false, "Saving...");
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
  profilePicInput.value = userInfo.getUserInfo().avatar;
  editProfilePicFormValidator.resetValidation();
  profilePicPopup.open();
}
addPictureIcon.addEventListener("mouseup", handleOpenAddPictureForm);
editProfileIcon.addEventListener("mouseup", handleOpenProfileForm);
editProfilePicIcon.addEventListener("mouseup", handleOpenEditProfilePicForm);

let currentUserId = null;
api
  .initialize()
  .then(([user, cards]) => {
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
  })
  .catch((res) => {
    alert(res);
  });
