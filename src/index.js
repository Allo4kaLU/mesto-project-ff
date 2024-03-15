import './styles/index.css';
import {initialCards, createCard, likeCardButton, deleteCard} from './scripts/cards.js';
import {openModal, closeModal} from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditClose = document.querySelector(".popup__close");

const popupCard = document.querySelector(".popup_type_new-card");
const buttonCard = document.querySelector(".profile__add-button");
const poputCardClose = document.querySelector(".popup__card__close");

const popupImage = document.querySelector(".popup_type_image");
const poputImageClose = document.querySelector(".popup__img__close");

const formElement = document.forms.editProfile;
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const nameForm = formElement.elements.name;
const descriptionForm = formElement.elements.description;

const formNewPlace = document.forms.newPlace;
const textInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(createCard(element.link, element.name, deleteCard, likeCardButton, openPopupImage));
});

//первое модальное окно 
function closeOnBackDropClickPopupEdit({ currentTarget, target }) {
  const popupEdit = currentTarget;
  const isClickedOnBackDrop = target === popupEdit;
  if (isClickedOnBackDrop) {
    removePopupEdit();
  }
}

function openPopupEdit() {
  openModal(popupEdit);
}

function removePopupEdit() {
  closeModal(popupEdit);
}

popupEdit.addEventListener('click', closeOnBackDropClickPopupEdit);
buttonEdit.addEventListener('click', onOpenPopupEdit);
popupEditClose.addEventListener('click', removePopupEdit);

//второе модальное окно
function closeOnBackDropClickPopupCard({ currentTarget, target }) {
  const popupCard = currentTarget;
  const isClickedOnBackDrop = target === popupCard;
  if (isClickedOnBackDrop) {
    removePopupCard();
  }
}

function openPopupCard() {
  openModal(popupCard);
}

function removePopupCard() {
  closeModal(popupCard);
}

popupCard.addEventListener('click', closeOnBackDropClickPopupCard);
buttonCard.addEventListener('click', openPopupCard);
poputCardClose.addEventListener('click', removePopupCard);

//третье модальное окно
function closeOnBackDropClickPopupImage({ currentTarget, target }) {
  const popupCard = currentTarget;
  const isClickedOnBackDrop = target === popupCard;
  if (isClickedOnBackDrop) {
    removePopupImage(); 
  }
}

function openPopupImage(evt) {
  const img = evt.target;
  document.querySelector('.popup__image').src = img.src;
  document.querySelector('.popup__image').alt = img.alt;
  document.querySelector('.popup__caption').textContent = img.alt;
  openModal(popupImage);
 }

function removePopupImage() {
  closeModal(popupImage);
}

popupImage.addEventListener('click', closeOnBackDropClickPopupImage);
poputImageClose.addEventListener('click', removePopupImage);

window.onkeydown = function( event ) {
  if ( event.keyCode == 27 ) {
    removePopupImage();
    removePopupEdit();
    removePopupCard();
  }
}

// 1 модальное окно
function handleForm() {
  nameForm.value = nameInput.textContent;
  descriptionForm.value = jobInput.textContent;
}

function onOpenPopupEdit() {
  handleForm();
  openPopupEdit();
}

function handleFormSubmit(evt) {
  evt.preventDefault();  
  nameInput.textContent = nameForm.value;
  jobInput.textContent = descriptionForm.value;
  removePopupEdit();
}

formElement.addEventListener('submit', handleFormSubmit); 

// 2 модальное окно
function addCardFormSubmit(evt) {
  evt.preventDefault();
  const urlInputValue = urlInput.value;
  const textInputValue = textInput.value;
  placesList.prepend(createCard(urlInputValue, textInputValue, deleteCard, likeCardButton, openPopupImage));
  formNewPlace.reset();
  removePopupCard();
}

formNewPlace.addEventListener('submit', addCardFormSubmit);