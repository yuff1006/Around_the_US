const editIcon = document.querySelector(".profile__edit-icon");
const addIcon = document.querySelector(".profile__add-icon");
const editForm = document.querySelector(".edit-form");
const pictureForm = document.querySelector(".edit-form_picture");
const closeButton = document.querySelector("#edit-form-close-author");
const closeButtonPicture = document.querySelector("#edit-form-close-picture")
const formName = document.querySelector("#edit-form-name");
const formTitle = document.querySelector("#edit-form-title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const formField = document.querySelector(".edit-form__form");
const cardsContainer = document.querySelector(".cards__container");
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

function openPopup(form) {
  form.classList.add("edit-form_open");
}

function closePopup(form) {
  form.classList.remove("edit-form_open");
}

function handleOpenForm(evt) {
  if (evt.target.id === "edit-icon") {
    formName.value = profileName.textContent;
    formTitle.value = profileTitle.textContent;
    openPopup(editForm);
  }
  else if (evt.target.id === "add-icon") {
    openPopup(pictureForm);
  }
}

function handleCloseForm(evt) {
  if (evt.target.id === "edit-form-close-picture") {
    closePopup(pictureForm);
  }
  else if (evt.target.id === "edit-form-close-author") {
    closePopup(editForm);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileTitle.textContent = formTitle.value;
  closePopup(editForm);
}

addIcon.addEventListener("click", handleOpenForm)
editIcon.addEventListener("click", handleOpenForm);
closeButton.addEventListener("click", handleCloseForm);
closeButtonPicture.addEventListener("click", handleCloseForm);
formField.addEventListener("submit", handleProfileFormSubmit);

// code for generating cards dynamically
function createCard(item) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__place");
  cardImage.alt = item.name;
  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  return cardElement;
}

initialCards.map(function(item) {
  const card = createCard(item);
  cardsContainer.append(card);
});

