import { requestLikeCard, requestUnLikeCard } from "./api";
let elementLikeCard = {};
const cardTemplate = document.querySelector("#card-template").content;
export function createCard(
  element,
  userId,
  onDeleteCard,
  likeCard,
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
    
  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton);
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      requestLikeCard(element._id)
    .then((res) => {
      cardLikeNumber.textContent = res.likes.length;
    })
    } else {
      requestUnLikeCard(element._id)
      .then((res) => {
        cardLikeNumber.textContent = res.likes.length;
      })
    }
    
  });
 
  cardImage.addEventListener("click", openPopupImage);
  return cardElement;
}

export function likeCard(evt) {
  if (evt.classList.contains("card__like-button")) {
    evt.classList.toggle("card__like-button_is-active");  
    console.log(evt);
  } 
}

export function deleteCard(card) {
  card.remove();
}
