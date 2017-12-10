import React from 'react'
import { Route, Link } from 'react-router'
import MainNavigation from '../Navbar/NavbarComponent'
import Footer from './FooterComponent'
import UserMessage from './UserMessage'
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat'
import auth from './auth'

import LoginUserMutation from '../../mutations/Session/Create'
import SignUpUserMutation from '../../mutations/User/Create'
import NoteUpdateMutation from '../..//mutations/Note/Update'
import NoteCreateMutation from '../../mutations/Note/Create'
import NoteDestroyMutation from '../../mutations/Note/Destroy'
import CourseCreateMutation from '../../mutations/Course/Create'
import CourseUpdateMutation from '../../mutations/Course/Update'
import CourseDestroyMutation from '../../mutations/Course/Destroy'
import LessonCreateMutation from '../../mutations/Lesson/Create'
import LessonUpdateMutation from '../../mutations/Lesson/Update'
import LessonDestroyMutation from '../../mutations/Lesson/Destroy'

import Dock from '../Dock/Dock'

import Audio from '../Audio/AudioIndex'
import Bible from '../Bible/BibleComponent'
import CourseLesson from '../Course/CourseLesson'
import CourseEditor from '../CourseEditor/CourseEditor'
import LessonEditor from '../LessonEditor/LessonEditor'
import CoursePrint from '../Course/CoursePrint'
import CourseIndex from '../Course/CourseIndex'
import Dashboard from '../Dashboard/Dashboard'
import NotesIndex from '../Note/NotesIndex'
import Library from '../Course/CoursesIndex'
import NotePageComponent from '../Note/NotePageComponent'
import NotePrintComponent from '../Note/NotePrintPageComponent'
import './App.scss'
import './Print.scss'
import './Typography.scss'

class App extends React.Component {

  constructor(props) {
    super(props);
    let onLine = false;

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
        login: true,
        signup: false,
        soundcloud: false,
        notepad: false,
        share: false,
        verse: false,
        notes: false,
        bookmark: false
      }

      let notesfilter = '';
      let notesCurrentPage = 1;

      if (this.props.viewer.notes !== undefined && this.props.viewer.notes.currentPage !== undefined) {
          notesCurrentPage = this.props.viewer.notes.currentPage;
      }

      let lang = "eng"

      if(localStorage.getItem('language') !== null){
        lang = localStorage.getItem('language')
      }

      let navs = []

      if(localStorage.getItem('navs') !== null && localStorage.getItem('navs') !== ""){
        navs = this.uniques(JSON.parse(localStorage.getItem('navs')))
      }

      localStorage.setItem('navs', navs)

    this.state = {
      oembed: {},
      online: onLine,
      email:null,
      password:null,
      user: user,
      language: lang,
      signup: {},
      player: {
       playStatus: false,
       currentSoundId: null
     },
     dockStatus: dockStatus,
     bibleStatus: 'both',
     error: this.props.viewer.error,
     token: token,

    myNotesWidget: {
// TODO props.relay.* APIs do not exist on compat containers
        filter: this.props.relay.variables.myNotesFilter,
        status: null
    },

    notesWidget: {
        showModal: false,
// TODO props.relay.* APIs do not exist on compat containers
        filter: this.props.relay.variables.noteFilter,
        notesCurrentPage: notesCurrentPage,
        status: null
    },
        coursesWidget: {
// TODO props.relay.* APIs do not exist on compat containers
          filter: this.props.relay.variables.coursesFilter,
            status: null
        },

      navs: navs
    };

  }

  componentWillMount() {

      if(this.props.params.reference !== undefined && this.props.params.reference !== null ){
          this.handleUpdateReferenceForAll(this.props.params.reference);
      }

      if(this.props.params.userCourseId !== undefined && this.props.params.userCourseId !== null ){
          this.handleUpdateUserCourse(this.props.params.userCourseId);
      }

      if(this.props.params.userLessonId !== undefined && this.props.params.userLessonId !== null ){
          this.handleUpdateUserLesson(this.props.params.userLessonId);
      }
      
      if(this.props.params.noteId !== undefined && this.props.params.noteId !== null ){
          this.handleLoadThisNote(this.props.params.noteId);
      }

      if(this.props.params.courseId !== undefined && this.props.params.courseId !== null){
          this.handleUpdateCourse(this.props.params.courseId)
      }

      if(this.props.params.lessonCursor !== undefined ){
          this.handleUpdateLesson(this.props.params.lessonCursor)
      }

  }

  componentWillReceiveProps(newProps) {

    let newState = this.state

    if (navigator.onLine && this.props.viewer.error.code !== 500 ) {
      newState. online = true
    } else {
        newState. online = false
    }

      if(newProps.viewer.user !== undefined && newProps.viewer.user.authenticated === true && this.props.viewer.user.authenticated === false){
          newState.dockStatus.login = true
          newState.dockStatus.signup = false
      }

    if (JSON.stringify(this.props.viewer.user) !== JSON.stringify(newProps.viewer.user)) {
      newState.user = newProps.viewer.user;
    }

      if(newProps.params.reference !== this.props.params.reference && newProps.params.reference !== undefined){
          this.handleUpdateReferenceForAll(newProps.params.reference)
      }

      if(newProps.params.noteId !== this.props.params.noteId && newProps.params.noteId !== undefined){
          this.handleLoadThisNote(newProps.params.noteId)
      }

      if (JSON.stringify(this.state) !== JSON.stringify(newState)) {
          this.setState(newState)
      }

      if(newProps.params.courseId !== this.props.params.courseId && newProps.params.courseId !== undefined){
          this.handleUpdateCourse(newProps.params.courseId)
      }

       if(newProps.params.userCourseId !== undefined && newProps.params.userCourseId !== this.props.params.userCourseId ){
          this.handleUpdateUserCourse(newProps.params.userCourseId);
      }

      if(newProps.params.userLessonId !== undefined && this.props.params.userLessonId !== newProps.params.userLessonId ){
          this.handleUpdateUserLesson(newProps.params.userLessonId);
      }

      if(newProps.params.lessonCursor !== undefined && this.props.params.lessonCursor !== newProps.params.lessonCursor ){
          this.handleUpdateLesson(newProps.params.lessonCursor);
      }

  }

  render() {

    let user = this.state.user;
    let navs = this.state.navs


    let children = null;
    localStorage.setItem('navs', JSON.stringify(navs));

    if (this.props.children !== null) {
      children = React.cloneElement(this.props.children, { online: this.state.online });
    }

    let dock = null

      if(this.state.dockStatus.main) {
          dock =   <section id="dock-section">
           <Dock
                status={this.state.dockStatus}
                player={this.state.player}
                handleCloseAudio={this.handleCloseAudio.bind(this)}
                user={user}
                notes={this.props.viewer.notes? this.props.viewer.notes:null}
                handleUpdateNote={this.handleUpdateNote.bind(this)}
                online={this.state.online}
                handleEditThisNote={this.handleEditThisNote.bind(this)}
                note = {this.props.viewer.note? this.props.viewer.note:null}
                showInDockMenu={this.showInDockMenu.bind(this)}
                location={this.props.location}
                notesWidget={this.state.notesWidget}
                bibleVerse={this.props.viewer.bibleVerse? this.props.viewer.bibleVerse:null}
                crossReferences={this.props.viewer.crossReferences? this.props.viewer.crossReferences:null}
                handleUpdateNoteFilter = {this.handleUpdateNoteFilter.bind(this)}
                handleNextNotePage={this.handleNextNotePage.bind(this)}
            />
          </section>
      }     

	  return (
    	<div className='container'>

        <MainNavigation
        location={this.props.location}
        updateIt={this.state}
        route={this.props.route}
        user={user}
        online={this.state.online}
        handleOpenCloseDock = {this.handleOpenCloseDock.bind(this)}
        dockStatus={this.state.dockStatus.main}
        message={this.state.error.message}
       />

          <div className="sections">
          {dock}

          <section>
          <main>

             {React.cloneElement(children, {
               key: this.props.location.pathname,
               handlePlayAudio: this.handlePlayAudio.bind(this),
                 handleEditThisNote: this.handleEditThisNote.bind(this),
                 viewer: this.props.viewer,
                 bibles: this.props.viewer.bibles,
                 courses: this.props.viewer.courses,
                 course: this.props.viewer.course,
                 note: this.props.viewer.note,
                 notes: this.props.viewer.notes,
                 verses: this.props.viewer.search? this.props.viewer.search.verses:null,
                 user: user,
                 handleChangeReference: this.handleChangeReference.bind(this),
                 handleUpdateReferenceForAll: this.handleUpdateReferenceForAll.bind(this),
                 handleChangeNoteFilter: this.handleChangeNoteFilter.bind(this),
                 bibleChapter: this.props.viewer.bibleChapter? this.props.viewer.bibleChapter:null,
                 bibleStatus: this.state.bibleStatus,
                 handleToggleBible: this.handleToggleBible.bind(this),
                 language: this.state.languge,

                  handleLogout: this.handleLogout.bind(this),
                  handleLogin: this.handleLogin.bind(this),
                  UpdateLoginEmail: this.UpdateLoginEmail.bind(this),
                  UpdateLoginPassword: this.UpdateLoginPassword.bind(this),
                  handleLoginStatus: this.handleLoginStatus.bind(this),
                  handleSignUp: this.handleSignUp.bind(this),
                  handleEditSignUpEmail: this.handleEditSignUpEmail.bind(this),
                  handleEditSignUpPassword: this.handleEditSignUpPassword.bind(this),
                  handleEditSignUpPasswordConfirm: this.handleEditSignUpPasswordConfirm.bind(this),
                  handleLogout: this.handleLogout.bind(this),
                  handleSignUpStatus: this.handleSignUpStatus.bind(this),   
                  signup: this.state.signup,
                  toggleLogin: this.toggleLogin.bind(this),
                  status: this.state.dockStatus,

                 handleUpdateNoteFilter: this.handleUpdateNoteFilter.bind(this),
                 handleNextNotePage: this.handleNextNotePage.bind(this),
                 handleApplyNoteFilter: this.handleApplyNoteFilter.bind(this),
                 handleNotesAreReady: this.notesAreReady.bind(this),
                 coursesWidget: this.state.coursesWidget,
                 handleUpdateCoursesFilter:this.handleUpdateCoursesFilter.bind(this),
                 handleNextCoursesPage: this.handleNextCoursesPage.bind(this),
                 handleLanguage: this.handleLanguage.bind(this),
// TODO props.relay.* APIs do not exist on compat containers
                 reference: this.props.relay.variables.reference? this.props.relay.variables.reference:"",
                 handleSearchBibleReference: this.handleSearchBibleReference.bind(this),
                 handleMoreSearch: this.handleMoreSearch.bind(this),
                notesWidget: this.state.notesWidget,
                  myNotesWidget: this.state.myNotesWidget,
                  userNotes: this.props.viewer.userNotes? this.props.viewer.userNotes:null,
                  userNote: this.props.viewer.userNote? this.props.viewer.userNote:null,
                  handleUpdateMyNoteFilter: this.handleUpdateMyNoteFilter.bind(this),
                  handleMoreMyNotes: this.handleMoreMyNotes.bind(this),

                  userCourse: this.props.viewer.userCourse? this.props.viewer.userCourse:null,
                  userCourses: this.props.viewer.userCourses? this.props.viewer.userCourses:null,
                  handleMoreMyCourses: this.handleMoreMyCourses.bind(this),
                  handleUpdateMyCoursesFilter: this.handleUpdateMyCoursesFilter.bind(this),
                  
                  handleMyCourseMutation: this.handleMyCourseMutation.bind(this),
                  handleMyLessonMutation: this.handleMyLessonMutation.bind(this),
                  userLesson: this.props.viewer.userLesson,
                  handleBookmark: this.handleBookmark.bind(this),
                  deleteBookmark: this.deleteNav.bind(this),
                  bookmarks: navs

             })}

          </main>
          </section>
          </div>

          <UserMessage error={this.state.error} />
          <footer id='footer' className='push'><Footer user={user} /></footer>
    	</div>
    );
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

  handleLogout(redirectURL) {
    console.log('Logging user out...');
    let that = this;
    this.setState({
      user:{},
      error: {message:"You are Logged out!", code:200}
    })
    auth.logout();

    if(redirectURL !== "undefined"){
      this.props.history.push(redirectURL)
    }

  }

  handleLogin(e) {

    let that = this

    var onSuccess = (Login) => {

      let error = {}
      let tokenCreate = Login.tokenCreate
      let token = tokenCreate.token? tokenCreate.token:"";
      console.log('Mutation completed!', Login);

      if(tokenCreate.code === "200" || tokenCreate.code === 200 || tokenCreate.code === null){
        error = { message: 'Login Successful', code: 200 };
        auth.login(token);

        that.setState({
          error: error,
          token: token,
          user: tokenCreate.user
        });

      }else{
        console.log(tokenCreate)
        that.setState({
          error: { message: tokenCreate.message, code: tokenCreate.code }
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


  uniques(array) {
    return Array.from(new Set(array));
  }

  handleBookmark(e) {
  	e.preventDefault();

    if (this.props.location.pathname !== null) {
        console.log("book mark it ...")

      let navs = []

      if (this.state.navs !== null) {
        navs = this.state.navs;
      }

      navs.unshift(this.props.location.pathname);
      localStorage.setItem('navs', JSON.stringify(navs));
      let newState = this.state

      newState.error = { message: 'Bookmark saved! ' + this.props.location.pathname, code: 221 }
      newState.navs = navs
      this.setState(newState)
    }
  }

deleteNav(e){
  let index = e.target.dataset.id

  let newState = this.state

  newState.navs.splice(index,1)

  this.setState(newState)

   localStorage.setItem('navs', JSON.stringify(newState.navs));
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
      console.log("editing: " + e.target.dataset.id)

// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
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

// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
// TODO props.relay.* APIs do not exist on compat containers
            myNotesPageSize: this.props.relay.variables.myNotesPageSize + 15
        });

        let newState = this.state
        this.setState(newState);
    }

    handleUpdateNote(note) {

        this.setState({status: 'saving'});

        if (note.id === "newNoteEdge" || note.id === "") {
            console.log('creating note...')
            Relay.Store.commitUpdate(new NoteCreateMutation({
                newNoteEdge: note,
                notes: this.props.viewer.user.notes
            }));
        } else {

            console.log('updating note...', note)
            Relay.Store.commitUpdate(new NoteUpdateMutation({
                changedNote: note,
                note: this.props.viewer.note
            }));
        }
    }

    handleLoadThisNote(noteId){
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
    	this.props.relay.setVariables({
            noteId: noteId
        });
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
                s.dockStatus['login'] = true
                s.dockStatus['signup'] = false
            }else if(s.login === true && s.signup === false){
                s.dockStatus['login']  = false
                s.dockStatus['signup'] = false
            }else{
                s.dockStatus['login'] = false
                s.dockStatus['signup']= false
            }


        }else{
            s.dockStatus[name] = !s.dockStatus[name]
        }

        this.setState(s)
    }

    handleChangeNoteFilter(e){
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
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
        if (string !== undefined) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
            this.props.relay.setVariables({
                noteFilter: string.toLowerCase(),
                notesStartCursor: null
            });

        let s = this.state

        s.notesWidget.status = null
        s.notesWidget.filter =  string.toLowerCase()
        s.notesWidget.notesCurrentPage = 1
        this.setState(s);
        }

    }

    handleUpdateMyNoteFilter(e) {
        let string = e.target.value
        if (string !== undefined) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
            this.props.relay.setVariables({
                myNotesFilter: string.toLowerCase(),
                myNotesStartCursor: undefined
            });

        let s = this.state

        s.myNotesWidget.status = null
        s.myNotesWidget.notesCurrentPage = 1
        s.myNotesWidget.filter = string.toLowerCase()
        this.setState(s);
        }

    }

    notesAreReady(e){
        let s = this.state
        s.notesWidget.status = null
        this.setState(s)
    }

    handleApplyNoteFilter(e) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            noteFilter: this.state.notesWidget.filter? this.state.notesWidget.filter.toLowerCase():"",
            notesStartCursor: undefined
        });

        let s = this.state

        s.notesWidget.status = null
        s.notesWidget.notesCurrentPage = 1
        this.setState(s);

    }

    handleNextNotePage() {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            notesStartCursor: this.props.viewer.notes.pageInfo.endCursor
        });

        let newState = this.state
        newState.notesWidget.notesCurrentPage = this.state.notesWidget.notesCurrentPage + 1
        this.setState(newState);
    }


    handleApplyCoursesFilter(e) {
        e.preventDefault()
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            coursesFilter: this.state.coursesWidget.filter,
            coursesCursor: undefined
        });
    }

    handleUpdateCoursesFilter(string) {

        let newState = this.state
        newState.coursesWidget.filter = string
        this.setState(newState)
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            coursesFilter: string,
            coursesCursor: undefined
        });
    }
    handleUpdateCourse(courseId) {

// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            courseId: courseId
        });
    }

    handleUpdateUserLesson(lessonId) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            userLessonId: lessonId
        });
    }

    handleUpdateLesson(lessonCursor) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            lessonCursor: lessonCursor
        });
    }

    handleNextCoursesPage(e) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            coursesCursor: this.props.viewer.courses.pageInfo.endCursor
        });

    }

    handleLanguage(lang){
      localStorage.setItem('language',lang)
      let s = this.state
      s.languge = lang
      this.setState(s)
    }

    handleSearchBibleReference(term) {
        console.log('search submitted...');
        this.setState({ search: term });

        let url = term.replace(/\W+/g, '_');
        this.props.history.push('/bible/' + url.toLowerCase());
    }

    handleChangeReference(e){
        console.log('changing reference',e)
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            reference: e.target.dataset.reference
        });
    }

    handleUpdateReferenceForAll(ref){

// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            noteFilter: ref.toLowerCase(),
            notesStartCursor: null,
            reference: ref,
            searchCursor:undefined
        });

        let s = this.state

        s.notesWidget.status = null
        s.notesWidget.notesCurrentPage = 1
        s.notesWidget.filter = ref
        this.setState(s);

    }

    handleMoreSearch(e) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            searchCursor: this.props.viewer.search.verses.pageInfo.endCursor
        });

    }

    handleMoreMyCourses(e){
        e.preventDefault()
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
// TODO props.relay.* APIs do not exist on compat containers
            myCoursesPageSize: this.props.relay.variables.myCoursesPageSize + 15
        });
    }

    handleUpdateMyCoursesFilter(e) {
        let string = e.target.value
        if (string !== undefined) {
// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
            this.props.relay.setVariables({
                myCoursesFilter: string.toLowerCase(),
                myCoursesStartCursor: undefined
            });
        }

    }

       handleUpdateUserCourse(courseId) {

// TODO props.relay.* APIs do not exist on compat containers
// TODO needs manual handling
        this.props.relay.setVariables({
            userCourseId: courseId
        });
    }

    handleMyCourseMutation(userCourse, action) {

      let Mutation = null

       switch(action) {
          case "create":
              console.log('creating course...')
              Mutation = CourseCreateMutation
              break;
          case "update":
              console.log('updating course...')
              Mutation = CourseUpdateMutation
              break;
          case "destroy":
              console.log('destroying course...')
              Mutation = CourseDestroyMutation
              break;
          case "create_lesson":
              console.log('creating lesson...')
              Mutation = LessonCreateMutation
              break;

          default:
            console.log("no actions matched a course mutation:(", action)
      }

       var onSuccess = (Course) => {
            console.log('Mutation successful!', Course);
          };

          var onFailure = (transaction) => {
            var error = transaction.getError() || new Error('Course Mutation failed.');
            console.error('Course Mutation failed', error);
          };

      Relay.Store.commitUpdate(new Mutation({
          userCourse: userCourse,
          viewer: this.props.viewer
      }), { onFailure, onSuccess });
    
    }

     handleMyLessonMutation(userLesson, action) {

      let Mutation = null

       switch(action) {
          case "update":
              console.log('updating lesson...')
              Mutation = LessonUpdateMutation
              break;
          case "destroy":
              console.log('destroying lesson...')
              Mutation = LessonDestroyMutation
              break;
          default:
            console.log("no actions matched a lesson mutation:(", action)
      }

       var onSuccess = (Lesson) => {
            console.log('Mutation successful!', Lesson);
          };

          var onFailure = (transaction) => {
            var error = transaction.getError() || new Error('Lesson Mutation failed.');
            console.error('Lesson Mutation failed', error);
          };

      Relay.Store.commitUpdate(new Mutation({
          userLesson: userLesson,
          viewer: this.props.viewer
      }), { onFailure, onSuccess });
    
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
    viewer: {}
}

  /* TODO manually deal with:
  initialVariables: {
      noteId: undefined,
      noteFilter: undefined,
      reference: 'John 1',
      notesStartCursor: undefined,
      pageSize: 5,
      bibleVersion: 'kjv',
      versesPageSize: 200,
      courseId: undefined,
      coursesFilter: undefined,
      coursesPageSize: 6,
      coursesCursor:undefined,
      crPageSize: 20,
      myNotesFilter:null,
      myNotesPageSize: 15,
      myNotesStartCursor: undefined,
      myCoursesFilter:null,
      myCoursesPageSize: 15,
      myCoursesStartCursor: undefined,
      userCourseId: undefined,
      userLessonId: undefined,
      userNoteId: undefined,
      searchLimit:10,
      searchCursor:undefined,
      lessonCursor: undefined
  }
  */

export default createFragmentContainer(App, {
  todo: graphql`
    fragment App_note on Note (){
      id
    }
  `,
  viewer: graphql`
    fragment App_viewer on Viewer {
       token
      error{message, code}

      bibleChapter (filter: $reference){
        ...Bible_bibleChapter
        }

      bibleVerse (filter:$reference) {
        ...Dock_bibleVerse
      }

      note(id:$noteId){
        ...Dock_note
        ...NotePageComponent_note
        ...NotePrintComponent_note
      }

      crossReferences(first: $crPageSize, filter: $reference) {
        ...Dock_crossReferences
      }

      bibles (first:1, filter:$bibleVersion) {
        ...Bible_bibles
      }

      user{
          ...Audio_user
          ...Bible_user
          ...CourseLesson_user
          ...CourseIndex_user
          ...Dashboard_user
          ...Dock_user
          ...MainNavigation_user
          ...Footer_user
          ...NotesIndex_user
          ...NotePageComponent_user
          ...NotePrintComponent_user
          id
          authenticated
         }

        userCourse(id:$userCourseId){
            ...Dashboard_userCourse
          }

          userCourses(filter: $myCoursesFilter, first:$myCoursesPageSize, after:$myCoursesStartCursor){
            ...Dashboard_userCourses
            pageInfo{startCursor}
          }

          userNote(id:$userNoteId){
            id
          }

          userNotes(filter: $myNotesFilter, first:$myNotesPageSize, after:$myNotesStartCursor){
            ...Dashboard_userNotes
            pageInfo{endCursor, startCursor}
          }

          userLesson (id:$userLessonId){
            ...Dashboard_userLesson
          }

       notes (filter: $noteFilter, first:$pageSize, after:$notesStartCursor){
          ...Dock_notes
          ...NotesIndex_notes
          pageInfo{endCursor, startCursor}
        }
      course(id:$courseId){
        ...CouorseLesson_course
        ...CoursePrint_course
        ...CourseIndex_course
      }

    courses(filter:$coursesFilter, first:$coursesPageSize, after:$coursesCursor){
      totalCount
      pageInfo{endCursor, startCursor}
      ...Library_courses
      }


      search(filter: $reference){
        verses(first:$searchLimit, after:$searchCursor){
          pageInfo{endCursor, startCursor}
          ...Bible_verses
        }
       }


     }
  `,
})