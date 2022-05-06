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
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
  addNewCard(inputValues) {
    return fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
  getCardLikeInfo() {
    return this._handleFetchResponse("/cards");
  }
  deleteCard(cardId) {
    return this._handleFetchResponse(`/cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this._handleFetchResponse(`/cards/likes/${cardId}`, "PUT");
  }
  removeLike(cardId) {
    return this._handleFetchResponse(`/cards/likes/${cardId}`, "DELETE");
  }
  editProfilePic(avatarLink) {
    return fetch(
      `https://around.nomoreparties.co/v1/group-12/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink.avatar,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
}
