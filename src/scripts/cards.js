const cardTemplate = document.querySelector("#card-template").content;
export function createCard(link, name, deleteCard, likeCard, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardImage.addEventListener("click", openPopupImage);
  return cardElement;
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
