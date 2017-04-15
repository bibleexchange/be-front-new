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
                                <button onClick={this.props.showInDockMenu} data-name="login">{name}</button>
                            </li>

                            <li  className={"menu-"+ status.bookmarks}>
                                <button onClick={this.props.showInDockMenu} data-name="bookmarks">bookmarks</button>
                            </li>
                            <li className={"menu-"+ status.soundcloud}>
                                <button onClick={this.props.showInDockMenu} data-name="soundcloud">audio {playStatus}</button>
                            </li>
                            <li className={"menu-"+ status.notepad}>
                                <button onClick={this.props.showInDockMenu} data-name="notepad">notepad</button>
                            </li>
                        </ul>
                    </nav>

                    <ul className="main">
                        {mainLogin}

                        <li id="soundcloud"  className={"main-"+ status.soundcloud}><SoundCloudPlayer id={this.props.player.currentSoundId}/>
                            <button onClick={this.props.handleCloseAudio}>close</button></li>
                        <li id="bookmarks"  className={"main-"+ status.bookmarks}> BOOKMARKS: <BookMarksWidget navs={this.props.navs}/></li>
                        <li id="notepad"  className={"main-"+ status.notepad}> <NoteEditor handleUpdateNote={this.props.handleUpdateNote} moreNotes={this.props.moreMyNotes} user={this.props.user} note={this.props.note} notes={this.props.notes} handleEditThis={this.props.handleEditThisNote}/> </li>
                    </ul>
                </div>

            </div>
        );
    }

}

Dock.propTypes = {
  user: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
  notes: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Dock, {

    initialVariables: {
        verseId: "QmlibGVWZXJzZToxMDAxMDAx",
        userNotesCount:5
    },
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
