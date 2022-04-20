export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    // addEventListener for 1) method
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.classList.add("popup_open");
  }
  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  // Three ways to close the popup:
  // 1) hit ESC key
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    // 2) mouseup on the close button
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("mouseup", () => {
      this.close();
    });
    // 3) mouseup on the overlay
    this._popup.addEventListener("mouseup", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
