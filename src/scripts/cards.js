const cardTemplate = document.querySelector("#card-template").content;
export function createCard(element, userId, deleteCard, likeCard, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  console.log(element.owner._id);

 if (userId === element.owner._id) {
  cardDeleteButton.addEventListener('click', deleteCard(element._id, cardElement))
 } else {  
  cardDeleteButton.remove()
 }
  
  cardElement.querySelector(".card__like-button").addEventListener("click", likeCard);
  cardImage.addEventListener("click", openPopupImage);
  return cardElement;
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export function deleteCard(card, cardid) {
  card.remove();
}
