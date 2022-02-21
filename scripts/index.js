const editIcon = document.querySelector(".profile__edit-icon");
const editForm = document.querySelector(".edit-form");
const xButton = document.querySelector(".edit-form__X");
const formName = document.querySelector(".edit-form__name");
const formTitle = document.querySelector(".edit-form__person-title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const formField = document.querySelector(".edit-form__form");
formName.value = profileName.textContent;
formTitle.value = profileTitle.textContent;

editIcon.addEventListener("click", ()=> {
  editForm.classList.add("edit-form_open");
})

xButton.addEventListener("click", ()=> {
  editForm.classList.remove("edit-form_open");
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileTitle.textContent = formTitle.value;
  console.log(formName.value)
  editForm.classList.remove("edit-form_open");
}

formField.addEventListener("submit", handleProfileFormSubmit)


