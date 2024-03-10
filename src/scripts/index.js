import '../styles/index.css';
import {initialCards} from './cards.js';
import {}

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(link, name, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(createCard(element.link, element.name, deleteCard));
});
