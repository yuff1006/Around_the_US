export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  initialize() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  _handleFetchResponse(path, methodUsed = "GET") {
    return fetch(`${this._baseUrl}${path}`, {
      method: methodUsed,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
  getInitialCards() {
    return this._handleFetchResponse("/cards");
  }
  getUserInfo() {
    return this._handleFetchResponse("/users/me");
  }
  editUserProfile(inputValues) {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "PATCH",
      headers: {
        authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    }).then((res) => res.json());
  }
  addNewCard(inputValues) {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      method: "POST",
      headers: {
        authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link,
      }),
    }).then((res) => res.json());
  }
  getCardLikeInfo() {
    return this._handleFetchResponse("/cards");
  }
  deleteCard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  }

  addLike(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  }
  removeLike(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "1384428a-b01c-46ae-afda-f222b9d7dc7d",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  }
  editProfilePic() {}
}
