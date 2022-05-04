import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector(".popup__button");
  }

  _setEventListeners() {
    this._button.addEventListener("mouseup", this._handleSubmitClick);
    super._setEventListeners();
  }
  _handleSubmitClick = () => {
    //wait to be passed in in index.js
    this._handleFormSubmit();
    this.close();
  };
  close() {
    super.close();
    this._button.removeEventListener("mouseup", this._handleSubmitClick);
  }
}
