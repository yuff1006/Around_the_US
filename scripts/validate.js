export function resetValidation(settings, popupWindow) {
  const formEl = popupWindow.querySelector(settings.formSelector);
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  inputList.forEach((inputEl) => {
    hideInputError(settings, inputEl, formEl);
  });
  const submitButton = formEl.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, submitButton);
}

// function enableValidator(settings) {
//   // getting all the forms in the whole page
//   const formList = [...document.querySelectorAll(settings.formSelector)];
//   // iterate over this array of all forms
//   formList.forEach((formEl) => {
//     // prevent all forms from refreshing the page upon submit
//     formEl.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     // for all forms, we need to set event listeners
//     setEventListeners(settings, formEl);
//   });
// }
// // the forms are being iterated and within each of these forms, we are pulling and iterating through
// // inputs within each of these forms
// function setEventListeners(settings, formEl) {
//   const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
//   const buttonElement = formEl.querySelector(settings.submitButtonSelector);
//   inputList.forEach((inputEl) => {
//     inputEl.addEventListener("input", () => {
//       checkInputValidity(settings, inputEl, formEl);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

// function checkInputValidity(settings, inputEl, formEl) {
//   if (!inputEl.validity.valid) {
//     showInputError(settings, inputEl, formEl);
//   } else {
//     hideInputError(settings, inputEl, formEl);
//   }
// }

// function showInputError(settings, inputEl, formEl) {
//   // change teh input style upon error
//   inputEl.classList.add(settings.inputErrorClass);
//   // error message content
//   const errorMessage = inputEl.validationMessage;
//   // access the input id which is something like popup-description
//   const inputId = inputEl.id;
//   // the id of the span slot is the template literal
//   const errorEl = formEl.querySelector(`#${inputId}-error`);
//   errorEl.textContent = errorMessage;
//   errorEl.classList.add(settings.errorClass);
// }

// function hideInputError(settings, inputEl, formEl) {
//   inputEl.classList.remove(settings.inputErrorClass);
//   const inputId = inputEl.id;
//   const errorEl = formEl.querySelector(`#${inputId}-error`);
//   errorEl.textContent = "";
//   errorEl.classList.remove(settings.errorClass);
// }

// const hasInvalidInput = (inputList) =>
//   inputList.some((inputEl) => !inputEl.validity.valid);

// function toggleButtonState(inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.disabled = false;
//   }
// }

// enableValidator({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__info",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   // input line error style
//   inputErrorClass: "popup__info_type_error",
//   // error message class
//   errorClass: "popup__error_visible",
// });
