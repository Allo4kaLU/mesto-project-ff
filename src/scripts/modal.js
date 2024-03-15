export function openModal(elementModal) {
    elementModal.classList.add('popup_is-opened');
}    
export function closeModal(elementModal) {
    elementModal.classList.remove('popup_is-opened');
    elementModal.classList.add('popup_is-animated');
}