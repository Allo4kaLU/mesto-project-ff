import "./styles/index.css";
import { initialCards } from "./scripts/initialCards.js";
import { createCard, likeCard, deleteCard } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";

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

const profileForm = document.forms.editProfile;
const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__description");
const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;

const formNewPlace = document.forms.newPlace;
const bigImage = document.querySelector(".popup__image");
const bigImageTitle = document.querySelector(".popup__caption");
const textInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.append(
    createCard(element.link, element.name, deleteCard, likeCard, openPopupImage)
  );
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
  document.addEventListener("keydown", handleEscape);
}

function removePopupEdit() {
  closeModal(popupEdit);
  document.removeEventListener("keydown", handleEscape);
}

popupEdit.addEventListener("click", closeOnBackDropClickPopupEdit);
buttonEdit.addEventListener("click", onOpenPopupEdit);
popupEditClose.addEventListener("click", removePopupEdit);

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
  document.addEventListener("keydown", handleEscape);
}

function removePopupCard() {
  closeModal(popupCard);
  document.removeEventListener("keydown", handleEscape);
}

popupCard.addEventListener("click", closeOnBackDropClickPopupCard);
buttonCard.addEventListener("click", openPopupCard);
poputCardClose.addEventListener("click", removePopupCard);

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
  bigImage.src = img.src;
  bigImage.alt = img.alt;
  bigImageTitle.textContent = img.alt;
  openModal(popupImage);
  document.addEventListener("keydown", handleEscape);
}

function removePopupImage() {
  closeModal(popupImage);
  document.removeEventListener("keydown", handleEscape);
}

popupImage.addEventListener("click", closeOnBackDropClickPopupImage);
poputImageClose.addEventListener("click", removePopupImage);

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    removePopupEdit();
    removePopupImage();
    removePopupCard();
  }
}

// 1 модальное окно
function fillProfileInputs() {
  nameInput.value = nameTitle.textContent;
  descriptionInput.value = jobTitle.textContent;
}

function onOpenPopupEdit() {
  fillProfileInputs();
  openPopupEdit();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = descriptionInput.value;
  removePopupEdit();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// 2 модальное окно
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const urlInputValue = urlInput.value;
  const textInputValue = textInput.value;
  placesList.prepend(
    createCard(
      urlInputValue,
      textInputValue,
      deleteCard,
      likeCard,
      openPopupImage
    )
  );
  formNewPlace.reset();
  removePopupCard();
}

formNewPlace.addEventListener("submit", handleCardFormSubmit);
