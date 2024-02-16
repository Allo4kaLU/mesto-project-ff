// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(link, name, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  placesList.append(cardElement);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  createCard(element.link, element.name, deleteCard);
});