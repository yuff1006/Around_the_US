export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSlot = document.querySelector(nameSelector);
    this._jobSlot = document.querySelector(jobSelector);
  }
  // to populate form fields after popup open
  getUserInfo() {
    return {
      userName: this._nameSlot.textContent,
      userJob: this._jobSlot.textContent,
    };
  }
  // upon form submission
  setUserInfo(data) {
    this._nameSlot.textContent = data.userName;
    this._jobSlot.textContent = data.userJob;
  }
}
