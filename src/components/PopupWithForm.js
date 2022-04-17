import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    //we still need to verify user input before doing this
    const inputList = [...this._popup.querySelectorAll(".popup__info")];
    const inputContent = [];
    inputList.forEach((inputEl) => {
      inputContent.push(inputEl.value);
    });
    return inputContent;
  }
  setEventListeners() {
    //we need to add the event listener listening for submit button that's specific to forms

    const submitButton = this._popup.querySelector(".popup__button");
    submitButton.addEventListener("mouseup", (evt) => {
      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues);
      this.close();
    });
    super.setEventListeners();
    //remember to put newpopup.setEventListeners() into a variable so it can get the submit results
    //we need to reset the form input contents once the modal is closed
  }
  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}
