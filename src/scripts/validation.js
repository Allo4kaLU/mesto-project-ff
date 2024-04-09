export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactivButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(validationConfig.inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(validationConfig.errorClass); 
}; 

const hideInputError = (formElement, inputElement) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(validationConfig.inputErrorClass); 
  errorElement.classList.remove(validationConfig.errorClass); 
  errorElement.textContent = ""; 
}; 

// Функция, которая проверяет валидность поля 

const isValid = (formElement, inputElement) => { 
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); 
  } else { 
    inputElement.setCustomValidity(""); 
  } 
    if (!inputElement.validity.valid) { 
    // Если поле не проходит валидацию, покажем ошибку 
    showInputError( 
      formElement, 
      inputElement, 
      inputElement.validationMessage 
    ); 
  } else { 
    // Если проходит, скроем 
    hideInputError(formElement, inputElement); 
  } 
}; 

function setEventListeners(formElement) { 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector); 
  toggleButtonState(inputList, submitButtonElement); 
  inputList.forEach((inputElement) => { 
    inputElement.addEventListener("input", function () { 
      isValid(formElement, inputElement); 
      toggleButtonState(inputList, submitButtonElement); 
    }); 
  }); 
} 

export function enableValidation(validationConfig) { 
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 
  formList.forEach((formElement) => { 
    formElement.addEventListener("submit", (evt) => { 
      evt.preventDefault(); 
    }); 
    setEventListeners(formElement); 
  }); 
} 
// Функция переключения кнопки 

function hasInvalidInput(inputList) { 
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }); 
} 

function toggleButtonState(inputList, submitButtonElement) { 
  if (hasInvalidInput(inputList)) { 
    submitButtonElement.disabled = true; 
    submitButtonElement.classList.add(validationConfig.inactivButtonClass); 
  } else { 
    submitButtonElement.disabled = false; 
    submitButtonElement.classList.remove(validationConfig.inactivButtonClass); 
  } 
}  

export function clearValidation(formElement) { 
  const errorElementList = Array.from(formElement.querySelectorAll('.'+validationConfig.errorClass)); 
  errorElementList.forEach((errorElement) => { 
    errorElement.textContent = ""; 
  }); 
  const errorElementLineList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); 
  errorElementLineList.forEach((errorElementLine) => { 
    errorElementLine.classList.remove(validationConfig.inputErrorClass); 
  });   
} 