export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSlot = document.querySelector(nameSelector);
    this._jobSlot = document.querySelector(jobSelector);
  }
  // to populate form fields after popup open
  getUserInfo() {
    return {
      name: this._nameSlot.textContent,
      about: this._jobSlot.textContent,
    };
  }
  // upon form submission
  setUserInfo(data) {
    this._nameSlot.textContent = data.name;
    this._jobSlot.textContent = data.about;
  }
}
