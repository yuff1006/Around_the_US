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