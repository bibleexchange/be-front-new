import React from 'react';
import { Route, Link } from 'react-router';
import MainNavigation from '../Navbar/NavbarComponent';
import Footer from './FooterComponent';
import Relay from 'react-relay';
import auth from './auth'

import LoginUserMutation from '../../mutations/LoginUserMutation';
import SignUpUserMutation from '../../mutations/SignUpUserMutation';

import './App.scss';
import './Images.scss';
import './Print.scss';
import './Typography.scss';
import './Widget.scss';

import '../../assets/favicons/favicon.ico';

class App extends React.Component {
  constructor(props) {
    super(props);

    let loggedIn = false;
    let email = null;
    let password = null;

    if(this.props.location.query.backdoor !== undefined){
      let keys = this.props.location.query.backdoor.split('_');
      email = keys[0];
      password = keys[1];
    }

    if(this.props.viewer.user !== null){
      loggedIn = this.props.viewer.user.authenticated;
    }

    this.state = {
     oembedStatus:"closed",
     noteStatus:"closed",
     oembed:{},
     loggedIn: loggedIn, //auth.loggedIn()
     online: navigator.onLine,
     email : email,
     password: password,
     signup :{}
   };
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  }

    componentWillMount(){
      auth.onChange = this.updateAuth.bind(this)
      auth.login()

      if(this.props.location.query.backdoor !== undefined){
        this.handleLogin(null);
      }

    }

    render() {

      let user = this.props.viewer.user;
      console.log('User is Logged In: ' + this.state.loggedIn);

      let navs = this.uniques(JSON.parse(localStorage.getItem('navs')));
      localStorage.setItem('navs',JSON.stringify(navs));

	return (
    	<div className="container">
      	<MainNavigation location={this.props.location}
              updateIt={this.state}
              route={this.props.route}
              user={user}
              signup={this.state.signup}
              handleUpdateBookmarks={this.handleUpdateBookmarks.bind(this)}
              handleLogout={this.handleLogout.bind(this)}
              handleLogin={this.handleLogin.bind(this)}
              handleSignUp={this.handleSignUp.bind(this)}
              handleEditSignUpEmail={this.handleEditSignUpEmail.bind(this)}
              handleEditSignUpPassword={this.handleEditSignUpPassword.bind(this)}
              handleEditSignUpPasswordConfirm={this.handleEditSignUpPasswordConfirm.bind(this)}
              handleBookmark={this.handleBookmark.bind(this)}
              loggedIn = {this.state.loggedIn}
              online={this.state.online}
              UpdateLoginEmail={this.UpdateLoginEmail.bind(this)}
              UpdateLoginPassword={this.UpdateLoginPassword.bind(this)}
              navs={navs}
              />

          <main>
            {this.props.children}
          </main>

          <footer id="footer" className="push"><Footer loggedIn={this.state.loggedIn} user={user}/></footer>
    	</div>
    );
  }

  handleUpdateBookmarks(string){
    this.setState({string});
  }

  handleChangeOembed(resourceUrl) {
    console.log('change oembed please...', resourceUrl);
    //oembed: soundcloud,
          let host_oembed_url = "http://soundcloud.com/oembed";
          let resource_url = resourceUrl;
          let url = host_oembed_url+"?format=json&&url="+resource_url;
          let that = this;

          var xhr = new XMLHttpRequest();
          xhr.responseType = 'json';

          if (!xhr) {
            throw new Error('CORS not supported');
          }

          xhr.onload = function() {
           that.setState({oembed:xhr.response, status:"close"});
          };

          xhr.open('GET', url);
          xhr.send();

          console.log(xhr);
    }

  handleChangeNote(event) {
    event.preventDefault();
    console.log('change note please...');

    let inputs = event.target.getElementsByTagName("input");

    let data = [];
    let i = 0;

    while (i < inputs.length){
       let x = {key:inputs[i].getAttribute('name'), value:inputs[i].getAttribute('value')};
       data.push(x);
       i++;
    }
    console.log(data);
  }

  handleLogout(e) {
  	//e.preventDefault();
    auth.logout();
    //window.location.href = '/logout';
  }

  handleLogin(e){

    var onSuccess = (Login) => {
      console.log('Mutation successful!', Login ,' Stored token: ', Login.loginUser.user.token);
	    localStorage.setItem("be_token", Login.loginUser.user.token);
      this.setState({token:Login.loginUser.user.token});
      auth.login();
      //this.context.router.push('/log-me-in');
    };

    var onFailure = (transaction) => {
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

   let details = {
  	email: this.state.email,
  	password: this.state.password
   };

    Relay.Store.commitUpdate(
       new LoginUserMutation({input: details, user: this.props.viewer.user}), {onFailure, onSuccess}
     );

  }

  handleSignUp(e){

    var onSuccess = (Login) => {
      console.log('Mutation successful!', Login ,' Stored token: ', Login.signUpUser.user.token);
	    localStorage.setItem("be_token", Login.signUpUser.user.token);
      this.setState({token:Login.signUpUser.user.token});
      auth.login();
      this.setState({signup:{}});
      console.log('Signup and Login Successful!');
    };

    var onFailure = (transaction) => {
      var error = transaction.getError() || new Error('Sign Up failed.');
      console.error("Signup failed", error);
    };

   let details = {
  	email: this.state.signup.email,
  	password: this.state.signup.password
   };

    Relay.Store.commitUpdate(
       new SignUpUserMutation({input: details, user: this.props.viewer.user}), {onFailure, onSuccess}
     );

  }

  UpdateLoginEmail(e){
    this.state.email = e.target.value;
  }

  UpdateLoginPassword(e){
    this.state.password = e.target.value;
  }

  handleEditSignUpEmail(e){
    let newSignup = this.state.signup;
    console.log(e.target.value);
    newSignup.email = e.target.value;
    this.setState({signup:newSignup});
  }

  handleEditSignUpPassword(e){
    let newSignup = this.state.signup;
    newSignup.password = e.target.value;
    this.setState({signup:newSignup});
  }

  handleEditSignUpPasswordConfirm(e){

    let newSignup = this.state.signup;
    newSignup.password_confirmation = e.target.value;

    if(e.target.value !== this.state.signup.password){
      newSignup.message = "passwords do not match :(";
    }else{
      newSignup.message = "passwords match :)";
    }
      this.setState({signup:newSignup});
  }

  handleBookmark(e) {
  	e.preventDefault();
  	console.log('I would like a book mark feature sometime soon! ', this.props.location.pathname);

    if(this.props.location.pathname !== null){
      let navs = JSON.parse(localStorage.getItem('navs'));

      if (navs === null){
        navs = [];
      }

      navs.unshift(this.props.location.pathname);
      localStorage.setItem('navs', JSON.stringify(navs));

      this.handleUpdateBookmarks(navs);

      this.setState({message:'bookmarked'});
      var that = this;
      setTimeout(function(){that.setState({message:''}); }, 1500);
    }

  }

  uniques(array) {
   return Array.from(new Set(array));
  }

}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

App.propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

export default Relay.createContainer(App, {
  initialVariables: {
    noteId: "",
    verseId: ""
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
          user{
              id
              token
  	      name
  	      email
  	      authenticated
          ${MainNavigation.getFragment('user')}
          ${Footer.getFragment('user')}
          ${LoginUserMutation.getFragment('user')}
          ${SignUpUserMutation.getFragment('user')}
          }
      }
    `,
  },
});
