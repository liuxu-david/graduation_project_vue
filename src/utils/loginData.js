class loginDataUtils {
  setLoginData(key, value) {
    window.localStorage.setItem(key, value);
  }
  removeLoginData(key) {
    window.localStorage.removeItem(key);
  }
  getLoginData(key) {
    return window.localStorage.getItem(key);
  }
  removeAllData() {
    window.localStorage.clear();
  }
}
export default new loginDataUtils();
