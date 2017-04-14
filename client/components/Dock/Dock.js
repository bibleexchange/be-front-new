import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Loading from '../ListWidget/Loading'
import SoundCloudPlayer from './SoundCloudPlayer'
import NoteEditor from '../NoteEditor/NoteEditorWidget'
import BookMarksWidget from './BookMarksWidget';
import LoginComponent from '../Login/LoginComponent';
import SignUpComponent from '../Login/SignUpComponent';
import './Dock.scss';

class Dock extends React.Component {

    componentWillMount() {

        this.state = {
            status: {
                login: !this.props.user.authenticated,
                signup: false,
                soundcloud: false,
                bookmarks: false,
                notepad: false
            }
        }
    }

    componentWllReceiveProps(newProps){
        if(newProps.user.authenticated === true){
            let status = this.state.status
            status.login = true
            status.signup = false
            this.setState({status: status})
        }else{
            let status = this.state.status
            status.login = true
            status.signup = false
            this.setState({status: status})
        }
    }

    render() {
    let status = this.state.status
    let name = 'login/register'
    let playStatus = null

        let mainLogin = <div><li id="login" className={"main-"+ status.login}><LoginComponent
            handleLogin={this.props.handleLogin}
            handleStatus={this.props.handleLoginStatus}
            user={this.props.user}
            UpdateLoginEmail={this.props.UpdateLoginEmail}
            UpdateLoginPassword={this.props.UpdateLoginPassword}
        /><input type="button" value="Register instead?" onClick={this.toggleLogin.bind(this)}/></li>
            <li id="signup"  className={"main-"+ status.signup}><SignUpComponent
                handleEditSignUpEmail={this.props.handleEditSignUpEmail}
                handleEditSignUpPassword={this.props.handleEditSignUpPassword}
                handleEditSignUpPasswordConfirm={this.props.handleEditSignUpPasswordConfirm}
                handleStatus={this.props.handleSignUpStatus}
                user={this.props.user}
                handleSignUp={this.props.handleSignUp}
                signup={this.props.signup}
            /><input type="button" value="Login instead?" onClick={this.toggleLogin.bind(this)}/></li></div>

        if (this.props.user.authenticated){
            name = 'profile'
            mainLogin = <li id="login" className={"main-"+ status.login}>EMAIL: {this.props.user.email}</li>
        }else{
            name = 'login/register'
        }

    if(this.props.player.playStatus === true){
            playStatus = '(!)'
    }
        return (
            <div id='dock-widget'>

                <div id="dock-main">

                    <nav id="dock-menu">
                        <ul>

                            <li  className={"menu-"+ status.login + " " + "menu-"+ status.signup}>
                                <button onClick={this.showInMenu.bind(this)} data-name="login">{name}</button>
                            </li>

                            <li  className={"menu-"+ status.bookmarks}>
                                <button onClick={this.showInMenu.bind(this)} data-name="bookmarks">bookmarks</button>
                            </li>
                            <li className={"menu-"+ status.soundcloud}>
                                <button onClick={this.showInMenu.bind(this)} data-name="soundcloud">audio {playStatus}</button>
                            </li>
                            <li className={"menu-"+ status.notepad}>
                                <button onClick={this.showInMenu.bind(this)} data-name="notepad">notepad</button>
                            </li>
                        </ul>
                    </nav>

                    <ul className="main">
                        {mainLogin}

                        <li id="soundcloud"  className={"main-"+ status.soundcloud}><SoundCloudPlayer id={this.props.player.currentSoundId}/>
                            <button onClick={this.props.handleCloseAudio}>close</button></li>
                        <li id="bookmarks"  className={"main-"+ status.bookmarks}> BOOKMARKS: <BookMarksWidget navs={this.props.navs}/></li>
                        <li id="notepad"  className={"main-"+ status.notepad}> <NoteEditor viewer={this.props.viewer} /> </li>
                    </ul>
                </div>

            </div>
        );
    }

    toggleLogin() {

        let s = this.state.status
        s.login = !s.login
        s.signup = !s.signup
        this.setState({status: s})
    }

    showInMenu(e){

        let s = this.state.status
        let name = e.target.dataset.name

        if(name === "login"){

            if(s.login === false && s.signup === false){
                console.log(1)
                s['login'] = true
                s['signup'] = false
            }else if(s.login === true && s.signup === false){
                console.log(2)
                s['login']  = false
                s['signup'] = false
            }else{
                console.log(3)
                s['login'] = false
                s['signup']= false
            }


        }else{
            s[name] = !s[name]
        }

        this.setState({status: s})
    }

}

Dock.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Dock, {
  initialVariables: {
    id:'',
    verseId: "QmlibGVWZXJzZToxMDAxMDAx",
    noteId:"Tm90ZToyMzUxNQ=="
  },
  fragments: {
    viewer: ({verseId, noteId}) => Relay.QL`
      fragment on Viewer  {
        ${NoteEditor.getFragment('viewer', {noteId})}
        note(id:$noteId){
          id
          title
          type
          body
          tags_string
        }
        bibleVerses(id: $verseId, first: 1) {
          edges {
            node {
              id
              reference
            }
          }
        }

     }`,
      user: () => Relay.QL`
      fragment on User {
        authenticated
        name
        email
        ${LoginComponent.getFragment('user')}
        ${SignUpComponent.getFragment('user')}
      }
    `,
  }
});
