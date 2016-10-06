import React from 'react';
import { Route, Link } from 'react-router';
import MainNavigation from '../Navbar/NavbarComponent';
import Footer from './FooterComponent';
import AlwaysWidget from './AlwaysWidgetComponent';
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

    this.state = {
     oembedStatus:"closed",
     noteStatus:"closed",
     oembed:{},
     loggedIn: auth.loggedIn(),
     online: navigator.onLine,
     email : null,
     password:null
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
    }

    render() {

      let user = {};

      if(this.props.viewer.user !== null){
        user = this.props.viewer.user;
      }

    console.log('User is Logged In: ' + this.state.loggedIn);
	return (
	<div className="container">
  	<MainNavigation location={this.props.location}
          updateIt={this.state}
          route={this.props.route}
          user={user}
          handleUpdateBookmarks={this.handleUpdateBookmarks.bind(this)}
          handleLogout={this.handleLogout.bind(this)}
          handleLogin={this.handleLogin.bind(this)}
          handleSignUp={this.handleSignUp.bind(this)}
          handleBookmark={this.handleBookmark.bind(this)}
          loggedIn = {this.state.loggedIn}
          online={this.state.online}
          UpdateLoginEmail={this.UpdateLoginEmail.bind(this)}
          UpdateLoginPassword={this.UpdateLoginPassword.bind(this)}
          />

      <main>
        {this.props.children}

      </main>

      <footer id="footer" className="redBG push"><Footer loggedIn={this.state.loggedIn} user={user}/></footer>
	{/*
          <AlwaysWidget
            oembed={this.state.oembed}
            note={this.props.viewer.note}
            handleChangeNote={this.handleChangeNote.bind(this)}
            handleChangeOembed={this.handleChangeOembed.bind(this)}
            />
        */}
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
       new SignUpUserMutation({input: details, user: this.props.viewer.user}), {onFailure, onSuccess}
     );

  }

  UpdateLoginEmail(e){
    this.state.email = e.target.value;
  }

  UpdateLoginPassword(e){
    this.state.password = e.target.value;
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
            email
            ${MainNavigation.getFragment('user')}
            ${Footer.getFragment('user')}
            ${LoginUserMutation.getFragment('user')}
          }
          note(id:$noteId){
            ${AlwaysWidget.getFragment('note')}
          }
          bibleVerse(id:$verseId){
            ${AlwaysWidget.getFragment('verse')}
          }
      }
    `,
  },
});
