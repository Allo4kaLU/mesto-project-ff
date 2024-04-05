import { requestLikeCard } from "./api";
let elementLikeCard = {};
const cardTemplate = document.querySelector("#card-template").content;
export function createCard(
  element,
  userId,
  onDeleteCard,
  onLikeCard,
  openPopupImage
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  cardLikeNumber.textContent = element.likes.length;

  if (userId === element.owner._id) {
    cardDeleteButton.addEventListener("click", () =>
      onDeleteCard(element._id, cardElement)
    );
  } else {
    cardDeleteButton.remove();
  }
    
  cardLikeButton.addEventListener("click", () => 
   onLikeCard(element._id, cardElement),
   requestLikeCard(element._id));
  
  cardImage.addEventListener("click", openPopupImage);
  return cardElement;
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.add("card__like-button_is-active");  
    requestLikeCard(elementLikeCard._id)   
  }
}

export function deleteCard(card) {
  card.remove();
}
