import React from 'react'
import { Route, Link } from 'react-router'
import MainNavigation from '../Navbar/NavbarComponent'
import Footer from './FooterComponent'
import Relay from 'react-relay'
import auth from './auth'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import LoginUserMutation from '../../mutations/LoginUserMutation'
import SignUpUserMutation from '../../mutations/SignUpUserMutation'
import NoteUpdateMutation from '../..//mutations/NoteUpdateMutation'
import NoteCreateMutation from '../../mutations/NoteCreateMutation'

import Dock from '../Dock/Dock'

import Bible from '../Bible/BibleComponent'
import Dashboard from '../Dashboard/DashboardComponent'

const COMPONENTS = [
    Dashboard,
    Bible
];

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

    let user = this.props.viewer.user ? this.props.viewer.user : { name: 'Guest' }

     let dockStatus = {
        main: false,
        login: !user.authenticated,
        signup: false,
        soundcloud: false,
        bookmarks: false,
        notepad: false
      }

      let notesfilter = '';
      let currentPage = 1;

      if (this.props.viewer.notes !== undefined) {
          currentPage = this.props.viewer.notes.currentPage;
      }

    this.state = {
      oembed: {},
      online: onLine,
      email,
      password,
      user: user,
      signup: {},
      player: {
       playStatus: false,
       currentSoundId: null
     },
     dockStatus: dockStatus,
     bibleStatus: 'both',
     error: this.props.viewer.error,
     token: token,
        notesWidget: {
            showModal: false,
            filter: this.props.relay.variables.noteFilter,
            notesCurrentPage: currentPage,
            status: null
        }
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

    let newState = this.state

    if (navigator.onLine && this.props.viewer.error.code !== 500 ) {
      newState. online = true
    } else {
        newState. online = false
    }

      if(newProps.viewer.user.authenticated === true){
          newState.dockStatus.login = true
          newState.dockStatus.signup = false
      }else{
          newState.dockStatus.login = true
          newState.dockStatus.signup = false
      }

    if (JSON.stringify(this.props.viewer.user) !== JSON.stringify(newProps.viewer.user)) {
      newState.user = newProps.viewer.user;
    }

      if (JSON.stringify(this.state) !== JSON.stringify(newState)) {
          this.setState(newState)
      }

  }

  render() {

    let errorMessage = null

    if(this.state.error !== false){
      errorMessage = <div id='im-online' className='onlinefalse'><h2>{this.state.error.code}: {this.state.error.message}</h2></div>
    }


    let user = this.state.user;
    let navs = this.uniques(JSON.parse(localStorage.getItem('navs')));
    let children = null;
    localStorage.setItem('navs', JSON.stringify(navs));

    if (this.props.children !== null) {
      children = React.cloneElement(this.props.children, { online: this.state.online });
    }

      let dockStyle = {
          display:"none"
      }

      if(this.state.dockStatus.main) {
          dockStyle = {
              display: "block"
          }
      }

	  return (
    	<div className='container'>

        <MainNavigation
            location={this.props.location}
        updateIt={this.state}
        route={this.props.route}
        user={user}
        handleUpdateBookmarks={this.handleUpdateBookmarks.bind(this)}
        handleLogout={this.handleLogout.bind(this)}
        handleBookmark={this.handleBookmark.bind(this)}
        online={this.state.online}
        handleOpenCloseDock = {this.handleOpenCloseDock.bind(this)}
       />

           {/* <p style={{ wordWrap : "break-word"}}>{JSON.stringify(this.state)}</p> */}

          <section style={dockStyle} id="dock-section">
            <Dock
                status={this.state.dockStatus}
                player={this.state.player}
                handleCloseAudio={this.handleCloseAudio.bind(this)}
                navs={navs}
                handleLogin={this.handleLogin.bind(this)}
                handleSignUp={this.handleSignUp.bind(this)}
                user={user}
                notes={this.props.viewer.user.notes}
                handleEditSignUpEmail={this.handleEditSignUpEmail.bind(this)}
                handleEditSignUpPassword={this.handleEditSignUpPassword.bind(this)}
                handleEditSignUpPasswordConfirm={this.handleEditSignUpPasswordConfirm.bind(this)}
                UpdateLoginEmail={this.UpdateLoginEmail.bind(this)}
                UpdateLoginPassword={this.UpdateLoginPassword.bind(this)}
                handleLoginStatus={this.handleLoginStatus.bind(this)}
                handleSignUpStatus={this.handleSignUpStatus.bind(this)}
                handleUpdateNote={this.handleUpdateNote.bind(this)}
                online={this.state.online}
                signup={this.state.signup}
                handleEditThisNote={this.handleEditThisNote.bind(this)}
                note = {this.props.viewer.note}
                moreMyNotes={this.handleMoreMyNotes.bind(this)}
                toggleLogin={this.toggleLogin.bind(this)}
                showInDockMenu={this.showInDockMenu.bind(this)}
            />
          </section>

          <main>

          <ReactCSSTransitionGroup
            component='section'
            transitionName='example'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >

             {React.cloneElement(children, {
               key: this.props.location.pathname,
               handlePlayAudio: this.handlePlayAudio.bind(this),
                 handleEditThisNote: this.handleEditThisNote.bind(this),
                 viewer: this.props.viewer,
                 crossReferences: this.props.viewer.crossReferences,
                 bibles: this.props.viewer.bibles,
                 handleChangeReference: this.handleChangeReference.bind(this),
                 handleChangeNoteFilter: this.handleChangeNoteFilter.bind(this),
                 bibleChapter: this.props.viewer.bibleChapter,
                 bibleVerse: this.props.viewer.bibleVerse,
                 bibleStatus: this.state.bibleStatus,
                 handleToggleBible: this.handleToggleBible.bind(this),
                 notes: this.props.viewer.notes,
                 notesWidget: this.state.notesWidget,
                 handleUpdateNoteFilter: this.handleUpdateNoteFilter.bind(this),

                 handleClearNoteFilter: this.handleClearNoteFilter.bind(this),
                 handleNextNotePage: this.handleNextNotePage.bind(this),
                 handleApplyNoteFilter: this.handleApplyNoteFilter.bind(this),
                 handleNotesAreReady: this.notesAreReady.bind(this)
             })}
          </ReactCSSTransitionGroup>



          </main>
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
    console.log("book mark it ...")
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
    this.setState({ player: { dockStatus: true, playStatus: true, currentSoundId: e.target.dataset.id}})
  }

  handleCloseAudio(){
    this.setState({ player: { playStatus: false, currentSoundId: null}})
  }

    handleOpenCloseDock(e){
        let nState = this.state
        nState.dockStatus.main = !nState.dockStatus.main
        this.setState(nState)
    }

    handleEditThisNote(e){
      e.preventDefault()

        this.props.relay.setVariables({
            noteId: e.target.dataset.id
        });
    }

    handleLoginStatus() {
        let status = this.state.loginStatus;
        this.setState({ loginStatus: !status, signUpStatus: false });
    }

    handleSignUpStatus() {
        let status = this.state.signUpStatus;
        this.setState({ signUpStatus: !status, closed: true });
    }

    handleMoreMyNotes(e){
        e.preventDefault()

        this.props.relay.setVariables({
            userNotesCount: this.props.relay.variables.userNotesCount+5
        });
    }

    handleUpdateNote(e) {
        e.preventDefault();
        this.setState({status: 'saving'});

        if (this.state.data.id === "newNoteEdge" || this.state.data.id === "") {
            console.log('creating note...')
            Relay.Store.commitUpdate(new NoteCreateMutation({
                newNoteEdge: this.state.data,
                user: this.props.user
            }));
        } else {

            console.log('updating note...', this.state.data)
            Relay.Store.commitUpdate(new NoteUpdateMutation({
                changedNote: this.state.data,
                note: this.props.note
            }));
        }
    }

    toggleLogin() {

        let s = this.state
        s.dockStatus.login = !s.dockStatus.login
        s.dockStatus.signup = !s.dockStatus.signup
        this.setState(s)
    }

    showInDockMenu(e){

        let s = this.state
        let name = e.target.dataset.name

        if(name === "login"){

            if(s.dockStatus.login === false && s.dockStatus.signup === false){
                console.log(1)
                s.dockStatus['login'] = true
                s.dockStatus['signup'] = false
            }else if(s.login === true && s.signup === false){
                console.log(2)
                s.dockStatus['login']  = false
                s.dockStatus['signup'] = false
            }else{
                console.log(3)
                s.dockStatus['login'] = false
                s.dockStatus['signup']= false
            }


        }else{
            s.dockStatus[name] = !s.dockStatus[name]
        }

        this.setState(s)
    }

    handleChangeReference(e){
        this.props.relay.setVariables({
            reference: e.target.dataset.reference
        });
    }

    handleChangeNoteFilter(e){
        this.props.relay.setVariables({
            noteFilter: e.target.dataset.reference
        });

        let s = this.state
        s.notesWidget.filter = e.target.dataset.reference

        this.setState(s)
    }

    handleToggleBible(e) {
      let n = this.state
        n.bibleStatus = !this.state.bibleStatus
        this.setState(n);
    }

    handleUpdateNoteFilter(string) {
        this.props.relay.setVariables({
            noteFilter: string.toLowerCase(),
            notesStartCursor: null
        });

        let s = this.state

        s.notesWidget.status = null

        s.notesWidget.notesCurrentPage = 1
        this.setState(s);

    }

    notesAreReady(e){
        let s = this.state
        s.notesWidget.status = null
        this.setState(s)
    }

    handleApplyNoteFilter(e) {
        this.props.relay.setVariables({
            noteFilter: this.state.notesWidget.filter? this.state.notesWidget.filter.toLowerCase():"",
            notesStartCursor: null
        });

        let s = this.state

        s.notesWidget.status = null
        s.notesWidget.notesCurrentPage = 1
        this.setState(s);

    }

    handleEditNoteFilter(event) {
        console.log(event.target.value)
        let newState = this.state;
        newState.notesWidget.filter = event.target.value
        this.setState(newState);
    }

    handleClearNoteFilter(event) {
        event.preventDefault();

        this.props.relay.setVariables({
            noteFilter: null,
            notesStartCursor: null
        });

        console.log("clearing: ", this.state.notesWidget.filter)
        let newState = this.state
        newState.notesWidget.filter = null
        newState.notesWidget.status = null

        this.setState(newState)
    }

    handleNextNotePage() {
        this.props.relay.setVariables({
            notesStartCursor: this.props.viewer.notes.pageInfo.endCursor
        });

        let newState = this.state
        newState.notesWidget.notesCurrentPage = this.state.notesWidget.notesCurrentPage + 1
        this.setState(newState);
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
    user: { 'name': 'Guest-1', 'authenticated': false },
      note: {'id':"blank","title":""}
  }
};

export default Relay.createContainer(App, {
  initialVariables: {
      noteId: 'newNoteEdge',
      noteFilter:'Acts 7:12',
      userNotesCount: 5,
      reference: 'acts_7_12',
      notesStartCursor: null,
      pageSize: 5,
      bibleVersion: 'kjv',
      versesPageSize: 200
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on Viewer {
        ${SignUpUserMutation.getFragment('viewer')}
        ${LoginUserMutation.getFragment('viewer')}
        
        ${Bible.getFragment('viewer', {reference: variables.reference, versesPageSize:  variables.versesPageSize, pageSize: variables.pageSize, bibleVersion:variables.bibleVersion})}
        
         bibleChapter (filter: $reference){
            ${Bible.getFragment('bibleChapter')}
	     }
	      
        bibleVerse (filter:$reference) {
          ${Bible.getFragment('bibleVerse')}
        }
        
        note(id:$noteId){
          id
          ${Dock.getFragment('note')}
          ${NoteUpdateMutation.getFragment('note')}
        }
        
        error{
          message
          code
        }
        
        crossReferences(first: 20, filter: $reference) {
          ${Bible.getFragment('crossReferences')}
        }
        
        bibles (first:1, filter:$bibleVersion) {
          ${Bible.getFragment('bibles')}
        }
        
        user{
            ${Dock.getFragment('user')}
            ${MainNavigation.getFragment('user')}
            ${Footer.getFragment('user')}
            id
            token
            name
            email
            authenticated
            nickname
            notes(first:$userNotesCount){
                ${Dock.getFragment('notes')}
                ${NoteCreateMutation.getFragment('notes')}
                pageInfo{hasNextPage}
                edges{
                    node {
                        id
                        title
                        verse {id, reference}
                    }
                }
            }
           } 
           
      	 notes (filter: $noteFilter, first:$pageSize, after:$notesStartCursor){
      	    pageInfo{
      	        hasNextPage
      	        endCursor
      	        startCursor
      	    }
            ${Bible.getFragment('notes')}
	      }   
            

      }
    `,
  },
});

