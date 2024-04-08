import "./styles/index.css";
import { createCard, likeCard, deleteCard } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { getInitialCards, getInitialUser, requestDeleteCard, requestAddCard, requestEditProfile, requestAvatar } from "./scripts/api.js";
import { clearValidation, enableValidation } from "./scripts/validation";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditClose = document.querySelector(".popup__close");

const popupCard = document.querySelector(".popup_type_new-card");
const buttonCard = document.querySelector(".profile__add-button");
const poputCardClose = document.querySelector(".popup__card__close");
let currentUserId;

const popupImage = document.querySelector(".popup_type_image");
const poputImageClose = document.querySelector(".popup__img__close");

const popupDeleteCard = document.querySelector(".popup_type_delete");
const formDeleteCard = popupDeleteCard.querySelector(".popup__form");
const popupDeleteCardClose = popupDeleteCard.querySelector(".popup__close");
let elementFormDeleteCard = {};


const profileForm = document.forms.editProfile;
const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__description");

const imgTitle = document.querySelector(".profile__image");
const popupChangAvatar = document.querySelector(".popup_type_avatar");
const formChangAvatar = popupChangAvatar.querySelector(".popup__form");
const popupChangAvatarClose = popupChangAvatar.querySelector(".popup__close");
const avatarInput = formChangAvatar.elements.avatar;

const nameInput = profileForm.elements.name;
const descriptionInput = profileForm.elements.description;

const formNewPlace = document.forms.newPlace;
const bigImage = document.querySelector(".popup__image");
const bigImageTitle = document.querySelector(".popup__caption");
const textInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");

const renderNewCards = (element, userId) => {
  placesList.prepend(
    createCard(element, userId, 
      (_id, cardElement) => {
        elementFormDeleteCard._id = _id;
        elementFormDeleteCard.cardElement = cardElement;
        openModal(popupDeleteCard);
        closeModal(popupDeleteCard);
      },
      likeCard, 
     openPopupImage)
  );
};

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
  clearValidation(popupEdit);
}

function removePopupEdit() {
  closeModal(popupEdit);
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
  clearValidation(popupCard);
}

function removePopupCard() {
  closeModal(popupCard);
  formNewPlace.reset();
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
}

function removePopupImage() {
  closeModal(popupImage);
}

popupImage.addEventListener("click", closeOnBackDropClickPopupImage);
poputImageClose.addEventListener("click", removePopupImage);

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
  requestEditProfile({ name: nameInput.value, about: descriptionInput.value })
  .then(() => {
    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = descriptionInput.value;
  })  
  removePopupEdit();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
 
// 2 модальное окно
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  requestAddCard( {name: textInput.value, link: urlInput.value} )
  .then((card) => {
    renderNewCards(card, currentUserId);
  })  
  removePopupCard();
}

formNewPlace.addEventListener("submit", handleCardFormSubmit);

// валидация
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// модальное окно удаления карточки
formDeleteCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  requestDeleteCard(elementFormDeleteCard._id)
        .then(() => {
          deleteCard(elementFormDeleteCard.cardElement);
          closeModal(popupDeleteCard);
       })
})

function closeOnBackDropClickPopupDeleteCard ({ currentTarget, target }) {
  const popupDeleteCard = currentTarget;
  const isClickedOnBackDrop = target === popupDeleteCard;
  if (isClickedOnBackDrop) {
    closeModal(popupDeleteCard);
  }
}

function closepopupDeleteCard () {
  closeModal(popupDeleteCard);
}

popupDeleteCard.addEventListener("click", closeOnBackDropClickPopupDeleteCard);
popupDeleteCardClose.addEventListener('click', closepopupDeleteCard);

// работа с API

getInitialUser().then((res) => {
  nameTitle.textContent = res.name;
  jobTitle.textContent = res.about;
  imgTitle.style.backgroundImage =`url('${res.avatar}')`;
});

Promise.all([getInitialCards(), getInitialUser()]).then(([result, res]) => {
  result.reverse().forEach((result) => {
    currentUserId = res._id;
    renderNewCards(result, res._id)
  });
});

//изменение аватара

function closeOnBackDropClickPopupAvatar({ currentTarget, target }) {
  const popupChangAvatar = currentTarget;
  const isClickedOnBackDrop = target === popupChangAvatar;
  if (isClickedOnBackDrop) {
    removePopupChangAvatar();
  }
}

function removePopupChangAvatar() {
  closeModal(popupChangAvatar);
  formChangAvatar.reset();
}

function onOpenPopupChangAvatar() {
  openModal(popupChangAvatar);
  clearValidation(popupChangAvatar);
}

imgTitle.addEventListener('click', onOpenPopupChangAvatar);

popupChangAvatar.addEventListener("click", closeOnBackDropClickPopupAvatar);
popupChangAvatarClose.addEventListener("click", removePopupChangAvatar);

function handleChangAvatarSubmit(evt) {
  evt.preventDefault();

requestAvatar({ avatar: avatarInput.value })
  .then((res) => {
    console.log(res.avatar);
    imgTitle.style.backgroundImage =`url('${res.avatar}')`;
  })   
  removePopupChangAvatar();
}

formChangAvatar.addEventListener("submit", handleChangAvatarSubmit);