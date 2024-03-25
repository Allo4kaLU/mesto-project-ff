(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r,c,o){var d=e.querySelector(".card").cloneNode(!0),a=d.querySelector(".card__image"),u=d.querySelector(".card__title");return a.src=t,a.alt=n,u.textContent=n,d.querySelector(".card__delete-button").addEventListener("click",r),d.querySelector(".card__like-button").addEventListener("click",c),a.addEventListener("click",o),d}function n(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}function r(e){e.target.closest(".places__item").remove()}function c(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",d)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d)}function d(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}var a=document.querySelector(".places__list"),u=document.querySelector(".popup_type_edit"),i=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup__close"),s=document.querySelector(".popup_type_new-card"),l=document.querySelector(".profile__add-button"),_=document.querySelector(".popup__card__close"),m=document.querySelector(".popup_type_image"),v=document.querySelector(".popup__img__close"),y=document.forms.editProfile,f=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),g=y.elements.name,q=y.elements.description,S=document.forms.newPlace,L=document.querySelector(".popup__image"),E=document.querySelector(".popup__caption"),x=document.querySelector(".popup__input_type_card-name"),b=document.querySelector(".popup__input_type_url");function h(){o(u)}function j(){o(s)}function C(e){var t=e.target;L.src=t.src,L.alt=t.alt,E.textContent=t.alt,c(m)}function w(){o(m)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){a.append(t(e.link,e.name,r,n,C))})),u.addEventListener("click",(function(e){var t=e.currentTarget;e.target===t&&h()})),i.addEventListener("click",(function(){g.value=f.textContent,q.value=k.textContent,c(u)})),p.addEventListener("click",h),s.addEventListener("click",(function(e){var t=e.currentTarget;e.target===t&&j()})),l.addEventListener("click",(function(){c(s)})),_.addEventListener("click",j),m.addEventListener("click",(function(e){var t=e.currentTarget;e.target===t&&w()})),v.addEventListener("click",w),y.addEventListener("submit",(function(e){e.preventDefault(),f.textContent=g.value,k.textContent=q.value,h()})),S.addEventListener("submit",(function(e){e.preventDefault();var c=b.value,o=x.value;a.prepend(t(c,o,r,n,C)),S.reset(),j()}))})();