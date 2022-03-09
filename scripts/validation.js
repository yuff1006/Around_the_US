const settings = {
  formSelector: ".edit-form__form",
  inputSelector: ".edit-form__info",
  submitButtonSelector: ".edit-form__button",
  inactiveButtonClass: "edit-form__button_disabled",
  // input line error style
  inputErrorClass: "edit-form__info_type_error",
  // error message class
  errorClass: "edit-form__error_visible"
}



function enableValidator() {
  // getting all the forms in the whole page
  const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
  // iterate over this array of all forms
  formList.forEach((formEl)=> {
    // prevent all forms from refreshing the page upon submit
    formEl.addEventListener("submit", (evt)=> {
      evt.preventDefault();
    })
    // for all forms, we need to set event listeners
    setEventListeners(formEl);
  })
};
// the forms are being iterated and within each of these forms, we are pulling and iterating through
// inputs within each of these forms
function setEventListeners(formEl) {
  const inputList = Array.from(formEl.querySelectorAll(`${settings.inputSelector}`));
  const buttonElement = formEl.querySelector(`${settings.submitButtonSelector}`);
  inputList.forEach((inputEl)=> {
    inputEl.addEventListener("input", ()=> {
      checkInputValidity(inputEl, formEl);
      toggleButtonState(inputList, buttonElement);
    })
  })
};

function checkInputValidity(inputEl, formEl) {
  if (!inputEl.validity.valid) {
    showInputError(inputEl, formEl);
  }
  else {
    hideInputError(inputEl, formEl);

  }
}

function showInputError(inputEl, formEl) {
  // change teh input style upon error
  inputEl.classList.add(`${settings.inputErrorClass}`);
  // error message content
  const errorMessage = inputEl.validationMessage;
  // access the input id which is something like edit-form-description
  const inputId = inputEl.id;
  // the id of the span slot is the template literal
  const spanSlot = formEl.querySelector(`#${inputId}-error`);
  spanSlot.textContent = errorMessage;
  spanSlot.classList.add(`${settings.errorClass}`);

}

function hideInputError(inputEl, formEl) {
  inputEl.classList.remove(`${settings.inputErrorClass}`);
  const inputId = inputEl.id;
  const spanSlot = formEl.querySelector(`#${inputId}-error`);
  spanSlot.textContent = "";
  spanSlot.classList.remove(`${settings.errorClass}`);
};

function hasInvalidInput(inputList) {
  return inputList.some((inputEl)=> {
    return !inputEl.validity.valid;
  })
}
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList) === true) {
    buttonElement.classList.add("edit-form__button_invalid")
  }
  else if (hasInvalidInput(inputList) === false) {
    buttonElement.classList.remove("edit-form__button_invalid")
  }
}



enableValidator();