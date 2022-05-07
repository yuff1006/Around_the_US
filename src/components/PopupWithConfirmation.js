import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__button");
  }

  setSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
    //wait to be passed in in index.js
  }
  close() {
    super.close();
    this._button.removeEventListener("mouseup", this._handleFormSubmit);
  }
  open() {
    super.open();
    this._button.addEventListener("mouseup", this._handleFormSubmit);
  }
}
