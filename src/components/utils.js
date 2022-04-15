// cards and card title, card URL
const closePopupButtons = Array.from(
  document.querySelectorAll(".popup__close")
);
const overlays = Array.from(document.querySelectorAll(".popup"));
export const cardsContainer = document.querySelector(".cards__container");
export const cardSelector = "#card";
export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keyup", listenForEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keyup", listenForEsc);
}
// Three ways to close the popup:
// 1) mouseup on the close button
closePopupButtons.forEach((button) => {
  button.addEventListener("mouseup", function () {
    closePopup(button.closest(".popup"));
  });
});
// 2) mouseup on the overlay
overlays.forEach((overlay) => {
  overlay.addEventListener("mouseup", (evt) => {
    closePopup(evt.target);
  });
});
// 3) hit ESC key
function listenForEsc(evt) {
  if (evt.key === "Escape") {
    // opened overlay at the time
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}
