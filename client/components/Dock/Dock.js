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

    render() {
    let status = this.props.status
    let name = 'login/register'
    let playStatus = null
    let bookmarksButton = null
    let bookmarksMain = null
    let notepadButton = null
    let notepadMain = null
    let audioButton = null
    let audioMain = null

        let mainLogin = <div><li id="login" className={"main-"+ status.login}><LoginComponent
            handleLogin={this.props.handleLogin}
            handleStatus={this.props.handleLoginStatus}
            user={this.props.user}
            UpdateLoginEmail={this.props.UpdateLoginEmail}
            UpdateLoginPassword={this.props.UpdateLoginPassword}
        /><input type="button" value="Register instead?" onClick={this.props.toggleLogin}/></li>
            <li id="signup"  className={"main-"+ status.signup}><SignUpComponent
                handleEditSignUpEmail={this.props.handleEditSignUpEmail}
                handleEditSignUpPassword={this.props.handleEditSignUpPassword}
                handleEditSignUpPasswordConfirm={this.props.handleEditSignUpPasswordConfirm}
                handleStatus={this.props.handleSignUpStatus}
                user={this.props.user}
                handleSignUp={this.props.handleSignUp}
                signup={this.props.signup}
            /><input type="button" value="Login instead?" onClick={this.props.toggleLogin}/></li></div>

        if (this.props.user.authenticated){
            name = 'profile'
            mainLogin = <li id="login" className={"main-"+ status.login}>EMAIL: {this.props.user.email}</li>
            notepadButton = <li className={"menu-"+ status.notepad}><button onClick={this.props.showInDockMenu} data-name="notepad">notepad</button></li>
            notepadMain =  <li id="notepad"  className={"main-"+ status.notepad}> <NoteEditor handleUpdateNote={this.props.handleUpdateNote} moreNotes={this.props.moreMyNotes} user={this.props.user} note={this.props.note} notes={this.props.notes} handleEditThis={this.props.handleEditThisNote}/> </li>
        }else{
            name = 'login/register'
            notepadButton = null
            notepadMain = null
        }

    if(this.props.player.playStatus === true){
            playStatus = '(!)'
    }

    if(this.props.bookmarks === undefined || this.props.bookmarks === null){
      bookmarksButton = null
      bookmarksMain = null
    }else{
      bookmarksButton = <li  className={"menu-"+ status.bookmarks}><button onClick={this.props.showInDockMenu} data-name="bookmarks">bookmarks</button></li>
      bookmarksMain = <li id="bookmarks"  className={"main-"+ status.bookmarks}> BOOKMARKS: <BookMarksWidget navs={this.props.navs}/></li>
    }

    if(this.props.player === undefined || this.props.player === null || this.props.player.playStatus === false){
      audioButton = null
      audioMain = null
    }else{
      audioButton = <li id="audio-player" className={"menu-"+ status.soundcloud}><button onClick={this.props.showInDockMenu} data-name="soundcloud">audio {playStatus}</button></li>
      audioMain =  <li id="soundcloud"  className={"main-"+ status.soundcloud}><SoundCloudPlayer id={this.props.player.currentSoundId} status={this.props.player.playStatus} handleCloseAudio={this.props.handleCloseAudio}/></li>
    }

        return (
            <div id='dock-widget'>

                <div id="dock-main">

                    <nav id="dock-menu">
                        <ul>

                            <li  className={"menu-"+ status.login + " " + "menu-"+ status.signup}>
                                <button onClick={this.props.showInDockMenu} data-name="login">{name}</button>
                            </li>
                            {audioButton}
                            {bookmarksButton}
                            {notepadButton}
                        </ul>
                    </nav>

                    <ul className="main">
                        {mainLogin}
                        {audioMain}
                        {bookmarksMain}
                        {notepadMain}
                    </ul>

                </div>

            </div>
        );
    }

}

Dock.propTypes = {
  user: React.PropTypes.object.isRequired,
  note: React.PropTypes.object,
  notes: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Dock, {

  fragments: {
      note: ()=> Relay.QL`fragment on Note {
                ${NoteEditor.getFragment('note')}
                id
                title
                type
                body
                tags_string
                verse{
                  id
                  reference
                }

        }`,
      user: () => Relay.QL`
      fragment on User {
        authenticated
        name
        email
        ${NoteEditor.getFragment('user')}
        ${LoginComponent.getFragment('user')}
        ${SignUpComponent.getFragment('user')}
      }
    `,
    notes: () => Relay.QL`
      fragment on SimpleNoteConnection {
        ${NoteEditor.getFragment('notes')}
            pageInfo{hasNextPage}
            edges{
                node {
                    id
                    title
                    verse {id, reference}
                }
      }
      }`,
  }
});
