// profile icons
const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
// author, add picture forms
const editProfileForm = document.querySelector("#edit-form");
const addPictureForm = document.querySelector(".edit-form_picture");
// author, add pictures forms close buttons and popup picture close button
const closeButtonAuthor = document.querySelector("#edit-form-close-author");
const closeButtonPicture = document.querySelector("#edit-form-close-picture");
const popupPictureClose = document.querySelector(".edit-form__close_picture");
// profile form two fields
const profileFormName = document.querySelector("#edit-form-name");
const profileFormTitle = document.querySelector("#edit-form-title");
// add picture form two fields
const pictureFormPlace = document.querySelector("#edit-form-place");
const pictureFormURL = document.querySelector("#edit-form-url");
// profile display
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
// form fields for the author form and the add picture form
const formFieldAuthor = document.querySelector("#form-field-author");
const formFieldPicture = document.querySelector("#form-field-picture");
// cards and card title, card URL
const cardsContainer = document.querySelector(".cards__container");
const pictureTitle = document.querySelector("#edit-form-title");
const pictureUrl = document.querySelector("#edit-form-url");
// picture popup container, caption, picture and close container
const popupContainer = document.querySelector("#picture-popup");
const popupCaption = document.querySelector(".edit-form__popup-caption");
const popupPicture = document.querySelector(".edit-form__picture");
popupCloseAndPicture = document.querySelector(".edit-form__close-and-picture");
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
function openPopup(form) {
  form.classList.add("edit-form_open");
}

function closePopup(form) {
  form.classList.remove("edit-form_open");
}
function handleOpenProfileForm() {
  profileFormName.value = profileName.textContent;
  profileFormTitle.value = profileTitle.textContent;
  openPopup(editProfileForm);
}
function handleOpenAddPictureForm() {
  openPopup(addPictureForm);
}
function handleCloseProfileForm() {
  closePopup(editProfileForm);
}
function handleCloseAddPictureForm() {
  closePopup(addPictureForm);
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
  const newCard = {};
  newCard.name = pictureFormPlace.value;
  newCard.link = pictureFormURL.value;
  cardsContainer.prepend(createCard(newCard));
  closePopup(addPictureForm);
}
//functions to handle popup pictures close and open
function openPicturePopup(evt) {
  openPopup(popupContainer);
  popupPicture.alt = evt.target.alt;
  popupPicture.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
}
function closePicturePopup() {
  closePopup(popupContainer);
}
//buttons for author, add picture, submit buttons for both and popup trigger's event listeners
addIcon.addEventListener("click", handleOpenAddPictureForm);
editIcon.addEventListener("click", handleOpenProfileForm);
closeButtonAuthor.addEventListener("click", handleCloseProfileForm);
closeButtonPicture.addEventListener("click", handleCloseAddPictureForm);
formFieldAuthor.addEventListener("submit", handleProfileFormSubmit);
formFieldPicture.addEventListener("submit", handlePictureFormSubmit);
popupPictureClose.addEventListener("click", closePicturePopup);

// code for generating cards dynamically
function createCard(item) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__place");
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  // interactivity for like button
  function handleLike(evt) {
    evt.target.classList.toggle("card__heart_active");
  }
  const heartButton = cardElement.querySelector(".card__heart");
  heartButton.addEventListener("click", handleLike);
  // function to delete cards using trash icon
  function deleteCard(evt) {
    evt.target.closest(".card").remove();
  }
  const trashButton = cardElement.querySelector(".card__trash");
  trashButton.addEventListener("click", deleteCard);
  // event listener for picture popup
  cardImage.addEventListener("click", openPicturePopup);
  // generate single card
  return cardElement;
}
//generate all six cards and append them to the card container
initialCards.map(function(item) {
  const card = createCard(item);
  cardsContainer.append(card);
});


