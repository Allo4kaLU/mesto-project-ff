import './styles/index.css';
import {initialCards} from './scripts/cards';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");


const popupEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const popupClose = document.querySelector(".popup__close");

const popupCard = document.querySelector(".popup_type_new-card");
const cardButton = document.querySelector(".profile__add-button");
const poputCardClose = document.querySelector(".popup__card__close");

const popupImage = document.querySelector(".popup_type_image");


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



function closeOnBackDropClickPopupEdit({ currentTarget, target }) {
  const popupEdit = currentTarget;
  const isClickedOnBackDrop = target === popupEdit;
  if (isClickedOnBackDrop) {
    removePopupEdit();
  }
}

window.onkeydown = function( event ) {
  if ( event.keyCode == 27 ) {
      removePopupEdit();
  }
};

function openPopupEdit() {
  popupEdit.classList.add('popup_is-opened');
}

function removePopupEdit() {
  popupEdit.classList.remove('popup_is-opened');
  popupEdit.classList.add('popup_is-animated');
}

popupEdit.addEventListener('click', closeOnBackDropClickPopupEdit);
editButton.addEventListener('click', openPopupEdit);
popupClose.addEventListener('click', removePopupEdit);



function closeOnBackDropClickPopupCard({ currentTarget, target }) {
  const popupCard = currentTarget;
  const isClickedOnBackDrop = target === popupCard;
  if (isClickedOnBackDrop) {
    removePopupCard();
  }
}

window.onkeydown = function( event ) {
  if ( event.keyCode == 27 ) {
    removePopupCard();
  }
};

function openPopupCard() {
  popupCard.classList.add('popup_is-opened');
}

function removePopupCard() {
  popupCard.classList.remove('popup_is-opened');
  popupCard.classList.add('popup_is-animated');
}

popupCard.addEventListener('click', closeOnBackDropClickPopupCard);
cardButton.addEventListener('click', openPopupCard);
poputCardClose.addEventListener('click', removePopupCard);


const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


function handleFormSubmit(evt) {
  evt.preventDefault();
  jobInput.textContent = jobInput.value;
  nameInput.textContent = nameInput.value;   
}

formElement.addEventListener('submit', handleFormSubmit); 