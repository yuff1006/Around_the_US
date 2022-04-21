import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputList = [...this._popup.querySelectorAll(".popup__info")];
    const inputContent = {};
    inputList.forEach((inputEl) => {
      inputContent[inputEl.name] = inputEl.value;
    });
    return inputContent;
  }
  _setEventListeners() {
    const formList = [...this._popup.querySelectorAll(".popup__form")];
    formList.forEach((formEl) => {
      formEl.addEventListener("submit", () => {
        const inputValues = this._getInputValues();
        this._handleFormSubmit(inputValues);
        this.close();
      });
    });
    super._setEventListeners();
  }
  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}
