export default class UserInfo {
  constructor([userName, userJob]) {
    this._name = userName;
    this._job = userJob;
  }
  // to populate form fields after popup open
  getUserInfo() {
    return { userName: this._name, userJob: this._job };
  }
  // upon form submission
  setUserInfo() {
    const nameSlot = document.querySelector(".profile__name");
    const jobSlot = document.querySelector(".profile__title");
    nameSlot.textContent = this._name;
    jobSlot.textContent = this._job;
  }
}
