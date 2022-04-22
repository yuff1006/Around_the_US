import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormSubmit = handleFormSubmit;
    this._formList = [...this._popup.querySelectorAll(".popup__form")];
    this._formEl = this._popup.querySelector(".popup__form");
  }
  // create and return an object from all the input boxes' answers
  _getInputValues() {
    const inputList = [...this._popup.querySelectorAll(".popup__info")];
    const inputContent = {};
    inputList.forEach((inputEl) => {
      inputContent[inputEl.name] = inputEl.value;
    });
    return inputContent;
  }
  _setEventListeners() {
    this._formList.forEach((formEl) => {
      formEl.addEventListener("submit", this._handleSubmitClick);
    });

    super._setEventListeners();
  }
  _handleSubmitClick = () => {
    const inputValues = this._getInputValues();

    //wait to be passed in in index.js
    this._handleFormSubmit(inputValues);
    this.close();
  };
  close() {
    super.close();
    this._formEl.removeEventListener("submit", this._handleSubmitClick);
  }
}
