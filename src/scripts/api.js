const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "3543702d-d723-4d61-9194-f342d149af8e",
    "Content-Type": "application/json",
  },
};

const hendleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(hendleResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(hendleResponse);
};

export const requestEditProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: 'Мерлин Монро',
      about: 'Американская певица и актриса',
      avatar: 'https://media.filmz.ru/photos/full/filmz.ru_f_108955.jpg'
    })
  })
}

export const requestEddCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: 'Египет',
      link: 'https://flomaster.top/uploads/posts/2023-01/1674129488_flomaster-club-p-yegipetskie-piramidi-risunok-krasivo-28.jpg'
    })
  })
}

export const requestDeleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(hendleResponse)
}
