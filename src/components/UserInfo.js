export default class UserInfo {
  constructor([userName, userJob]) {
    this._name = userName;
    this._job = userJob;
    this._nameSlot = document.querySelector(".profile__name");
    this._jobSlot = document.querySelector(".profile__title");
  }
  // to populate form fields after popup open
  getUserInfo() {
    this._name = this._nameSlot.textContent;
    this._job = this._jobSlot.textContent;
    return { userName: this._name, userJob: this._job };
  }
  // upon form submission
  setUserInfo(data) {
    this._nameSlot.textContent = data[0];
    this._jobSlot.textContent = data[1];
  }
}
