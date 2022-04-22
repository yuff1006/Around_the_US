import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormSubmit = handleFormSubmit;
    this._haha = this._haha.bind(this);
    this._formList = [...this._popup.querySelectorAll(".popup__form")];
    this._formEl = this._popup.querySelector(".popup__form");
  }
  // create and return an object from all the input boxes' answers
  _getInputValues() {
    console.log("hello");
    const inputList = [...this._popup.querySelectorAll(".popup__info")];
    const inputContent = {};
    inputList.forEach((inputEl) => {
      inputContent[inputEl.name] = inputEl.value;
    });
    return inputContent;
  }
  _setEventListeners() {
    this._formList.forEach((formEl) => {
      formEl.addEventListener("submit", this._haha);
    });

    super._setEventListeners();
  }
  _haha() {
    const inputValues = this._getInputValues();

    //wait to be passed in in index.js
    this._handleFormSubmit(inputValues);
    this.close();
  }
  close() {
    super.close();
    this._formEl.removeEventListener("submit", this._haha);
  }
}
