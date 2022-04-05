// picture popup container, caption, picture and close container
const popupContainer = document.querySelector("#picture-popup");
const popupCaption = document.querySelector(".popup__popup-caption");
const popupPicture = document.querySelector(".popup__picture");
//functions to handle popup pictures close and open
function openPicturePopup(evt) {
  popupPicture.alt = evt.target.alt;
  popupPicture.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupContainer);
}
