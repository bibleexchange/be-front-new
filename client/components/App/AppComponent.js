import React from 'react'
import { Route, Link } from 'react-router'
import MainNavigation from '../Navbar/NavbarComponent'
import Footer from './FooterComponent'
import Relay from 'react-relay'
import auth from './auth'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import LoginUserMutation from '../../mutations/LoginUserMutation'
import SignUpUserMutation from '../../mutations/SignUpUserMutation'
import Dock from '../Dock/Dock'
import './App.scss'
import './Print.scss'
import './Typography.scss'
import './Widget.scss'

import '../../assets/favicons/favicon.ico';

class App extends React.Component {
  constructor(props) {
    super(props);
    let email = null;
    let password = null;
    let onLine = false;

    if (this.props.location.query.backdoor !== undefined) {
      let keys = this.props.location.query.backdoor.split('_');
      email = keys[0];
      password = keys[1];
    }

    if (navigator.onLine && this.props.viewer.error.code !== 500) {
      onLine = true;
    } else {
      onLine = false;
    }

    let token = false

    if(auth.getToken() !== undefined){token = auth.getToken()}

    this.state = {
      oembed: {},
      online: onLine,
      email,
      password,
      user: this.props.viewer.user ? this.props.viewer.user : { name: 'Guest' },
      signup: {},
      player: {
       playStatus: false,
       currentSoundId: null
     },
     error: this.props.viewer.error,
     token: token
    };
  }

  updateAuth(trueOrFalse) {
    console.log('update auth ran. results: ', trueOrFalse);

    if (trueOrFalse === false) {
      let newState = this.state;
      newState.user.token = auth.getToken();
      newState.user.authenticated = false;

      this.setState(newState);
    } else {

    }
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this);

    if (this.state.token !== false) {
      //this.handleLogin(null);
    }else{
      this.setState({error:false})
    }
    let that = this

    window.setTimeout(function(){
      that.setState({
        error: false,
      });
    }, 3000)

  }

  componentWillReceiveProps(newProps) {
    if (navigator.onLine && this.props.viewer.error.code !== 500 ) {
      this.setState({ online: true });
    } else {
      this.setState({ online: false });
    }

    if (JSON.stringify(this.props.viewer.user) !== JSON.stringify(newProps.viewer.user)) {
      this.setState({ user: newProps.viewer.user });
    }

  }

  render() {

    let errorMessage = null

    if(this.state.error !== false){
      errorMessage = <div id='im-online' className='onlinefalse'><h2>{this.state.error.code}: {this.state.error.message}</h2></div>
    }


    let user = this.state.user;
    let navs = []//this.uniques(JSON.parse(localStorage.getItem('navs')));
    let children = null;
    //localStorage.setItem('navs', JSON.stringify(navs));

    if (this.props.children !== null) {
      children = React.cloneElement(this.props.children, { online: this.state.online });
    }

	  return (
    	<div className='container'>
        <Dock viewer={this.props.viewer} player={this.state.player} handleCloseAudio={this.handleCloseAudio.bind(this)}  />

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
        online={this.state.online}
        UpdateLoginEmail={this.UpdateLoginEmail.bind(this)}
        UpdateLoginPassword={this.UpdateLoginPassword.bind(this)}
        navs={navs}
       />

          <ReactCSSTransitionGroup
            component='main'
            transitionName='example'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >

             {React.cloneElement(children, {
               key: this.props.location.pathname,
               handlePlayAudio: this.handlePlayAudio.bind(this)
             })}
          </ReactCSSTransitionGroup>

          {errorMessage}

          <footer id='footer' className='push'><Footer user={user} /></footer>
    	</div>
    );
  }

  handleUpdateBookmarks(string) {
    this.setState({ string });
  }

  handleChangeNote(event) {
    event.preventDefault();
    console.log('change note please...');

    let inputs = event.target.getElementsByTagName('input');

    let data = [];
    let i = 0;

    while (i < inputs.length) {
      let x = { key: inputs[i].getAttribute('name'), value: inputs[i].getAttribute('value') };
      data.push(x);
      i++;
    }
  }

  handleLogout() {
    console.log('Logging user out...');
    let that = this;
    this.setState({
      user:{},
      error: {message:"You are Logged out!", code:200}
    })
            window.setTimeout(function(){
              that.setState({
                error: false,
              });
            }, 3000);

    auth.logout();
  }

  handleLogin(e) {

    let that = this

    var onSuccess = (Login) => {

      let error = {}
      let createToken = Login.createToken
      let token = createToken.token? createToken.token:"";
      console.log('Mutation completed!', Login, ' Stored token: ', token);

      if(createToken.code === "200" || createToken.code === 200 || createToken.code === null){
        error = { message: 'Login Successful', code: 200 };
        auth.login(token);

        that.setState({
          error: error,
          token: token,
          user: createToken.user
        });

        window.setTimeout(function(){
          that.setState({
            error: false,
          });
        }, 3000);

      }else{
        console.log(createToken)
        that.setState({
          error: { message: createToken.message, code: createToken.code }
        });
      }

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
       new LoginUserMutation({ input: details, viewer: this.props.viewer }), { onFailure, onSuccess }
     )
  }

  handleSignUp(e) {
    var onSuccess = (Login) => {
      console.log('Mutation successful!', Login, ' Stored token: ', Login.signUpUser.user.token);
	                                                                                                                                                                                                                                                                                                                localStorage.setItem('be_token', Login.signUpUser.user.token);
      this.setState({ token: Login.signUpUser.user.token });
      auth.login();
      this.setState({ signup: {} });
      console.log('Signup and Login Successful!');
    };

    var onFailure = (transaction) => {
      var error = transaction.getError() || new Error('Sign Up failed.');
      console.error('Signup failed', error);
    };

    let details = {
email: this.state.signup.email,
password: this.state.signup.password
    };

    Relay.Store.commitUpdate(
       new SignUpUserMutation({ input: details, user: this.props.viewer.user }), { onFailure, onSuccess }
     );
  }

  UpdateLoginEmail(e) {
    this.state.email = e.target.value;
  }

  UpdateLoginPassword(e) {
    this.state.password = e.target.value;
  }

  handleEditSignUpEmail(e) {
    let newSignup = this.state.signup;
    console.log(e.target.value);
    newSignup.email = e.target.value;
    this.setState({ signup: newSignup });
  }

  handleEditSignUpPassword(e) {
    let newSignup = this.state.signup;
    newSignup.password = e.target.value;
    this.setState({ signup: newSignup });
  }

  handleEditSignUpPasswordConfirm(e) {
    let newSignup = this.state.signup;
    newSignup.password_confirmation = e.target.value;

    if (e.target.value !== this.state.signup.password) {
      newSignup.message = 'passwords do not match :(';
    } else {
      newSignup.message = 'passwords match :)';
    }
    this.setState({ signup: newSignup });
  }

  handleBookmark(e) {
  	e.preventDefault();

    if (this.props.location.pathname !== null) {
      let navs = JSON.parse(localStorage.getItem('navs'));

      if (navs === null) {
        navs = [];
      }

      navs.unshift(this.props.location.pathname);
      localStorage.setItem('navs', JSON.stringify(navs));
      this.handleUpdateBookmarks(navs);
      var that = this;
      setTimeout(function () { that.setState({ message: { message: 'Bookmark saved!', code: 220 } }); }, 500);
    }
  }

  uniques(array) {
    return Array.from(new Set(array));
  }

  handlePlayAudio(e){
    console.log("new sound selected...")
    this.setState({ player: { playStatus: true, currentSoundId: e.target.dataset.id}})
  }

  handleCloseAudio(){
    this.setState({ player: { playStatus: false, currentSoundId: null}})
  }

}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  viewer: React.PropTypes.object.isRequired
};

App.defaultProps = {
  viewer: {
    user: { 'name': 'Guest-1', 'authenticated': false }
  }
};

export default Relay.createContainer(App, {
  initialVariables: {
    noteId: 'Tm90ZToyMzUxNQ==',
    verseId: "QmlibGVWZXJzZToxMDAxMDAx",
    filter:''
  },
  fragments: {
    viewer: ({verseId, noteId}) => Relay.QL`
      fragment on Viewer {
        ${SignUpUserMutation.getFragment('viewer')}
        ${LoginUserMutation.getFragment('viewer')}
        ${Dock.getFragment('viewer', {verseId, noteId})}

        error{
          message
          code
        }
          user{
              id
              token
      	      name
      	      email
      	      authenticated
              nickname
              ${MainNavigation.getFragment('user')}
              ${Footer.getFragment('user')}
          }
      }
    `,
  },
});
