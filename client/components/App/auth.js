module.exports = {
  login(token) {
    	localStorage.setItem("be_token", token)
      setTimeout(this.onChange(true),10000);
  },

  getToken() {
    return localStorage.be_token
  },

  logout() {
    delete localStorage.be_token
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.be_token
  },

  onChange() {}
}
