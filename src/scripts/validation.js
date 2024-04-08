const showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input_type_error_active");
  };
  
const hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input_type_error_active");
    errorElement.textContent = "";
  };
  
  // Функция, которая проверяет валидность поля
const enableValidationUR = (formSelector, inputSelector) => {
    if (inputSelector.validity.patternMismatch) {
      inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
    } else {
      inputSelector.setCustomValidity("");
    }
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(
        formSelector,
        inputSelector,
        inputSelector.validationMessage
      );
    } else {
      // Если проходит, скроем
      hideInputError(formSelector, inputSelector);
    }
  };
  
function setEventListeners(formSelector) {
    const inputList = Array.from(formSelector.querySelectorAll(".popup__input"));
    const submitButtonSelector = formSelector.querySelector(".popup__button");
    toggleButtonState(inputList, submitButtonSelector);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", function () {
        enableValidationUR(formSelector, inputSelector);
        toggleButtonState(inputList, submitButtonSelector);
      });
    });
  }
  
export function enableValidation() {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formSelector) => {
      formSelector.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formSelector);
    });
  }

  // Функция переключения кнопки

function hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }
  
function toggleButtonState(inputList, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {
      submitButtonSelector.disabled = true;
      submitButtonSelector.classList.add("popup__button_disabled");
    } else {
      submitButtonSelector.disabled = false;
      submitButtonSelector.classList.remove("popup__button_disabled");
    }
  }
  
export function clearValidation(formSelector) {
    const errorElementList = Array.from(formSelector.querySelectorAll(".popup__error_visible"));
    errorElementList.forEach((errorElement) => {
      errorElement.textContent = "";
    });
    const errorElementLineList = Array.from(formSelector.querySelectorAll(".popup__input"));
    errorElementLineList.forEach((errorElementLine) => {
      errorElementLine.classList.remove("popup__input_type_error");
    });  
  }