export function openModal(elementModal) {
  elementModal.classList.add("popup_is-animated");
  setTimeout(() => {
    elementModal.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", handleEscape);
}
export function closeModal(elementModal) {
  elementModal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
