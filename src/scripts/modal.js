export function openModal(elementModal) {
  elementModal.classList.add("popup_is-animated");
  setTimeout(() => {
    elementModal.classList.add("popup_is-opened");
  }, 1);
}
export function closeModal(elementModal) {
  elementModal.classList.add("popup_is-animated");
  setTimeout(() => {
    elementModal.classList.remove("popup_is-opened");
  }, 1);
}
