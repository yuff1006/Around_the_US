import Popup from "./Popup";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, image) {
    super(popupSelector);
    this._image = image;
  }
  open() {
    const imageEl = this._popup.querySelector(".popup__picture");
    imageEl.src = this._image.src;
    imageEl.alt = this._image.alt;
    const caption = this._popup.querySelector(".popup__popup-caption");
    caption.textContent = this._image.alt;
    super.open();
  }
}
