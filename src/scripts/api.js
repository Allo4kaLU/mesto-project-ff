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
  throw new Error['Error'];
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

export const requestEditProfile = (edit) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(edit)
  }).then(hendleResponse);
}

export const requestEddCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(card)
  }).then(hendleResponse)
}

export const requestDeleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(hendleResponse)
}
