export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add("popup_open");
  }
  close() {
    this._popup.classList.remove("popup_open");
  }
  // Three ways to close the popup:
  // 1) hit ESC key
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(this._popup);
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
    // addEventListener for 1) method
    document.addEventListener("keyup", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
