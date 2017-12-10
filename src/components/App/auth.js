module.exports = {
  login(token) {
    console.log(' Stored token: ', token)
    localStorage.setItem('be_token', token);
  },

  getToken() {
    return localStorage.be_token;
  },

  logout() {
    delete localStorage.be_token;
    setTimeout(this.onChange(true), 1000);
  },

  loggedIn() {
    return !!localStorage.be_token;
  },

  onChange() {}
};
