module.exports = {
  login() {
    if(localStorage.be_token){
      setTimeout(this.onChange(true),10000);
    }else{
      this.onChange(false)
    }
  },

  getToken() {
    return localStorage.be_token
  },

  logout() {
    console.log('Logging user out...');
    delete localStorage.be_token
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.be_token
  },

  onChange() {}
}
