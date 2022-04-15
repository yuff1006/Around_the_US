// cards and card title, card URL
const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);
const overlays = Array.from(document.querySelectorAll(".popup"));
export const cardsContainer = ".cards__container";
export const cardSelector = "#card";
export function openPopup(popup) {
  popup.classList.add("popup_open");
  //   document.addEventListener("keyup", listenForEsc);
}
