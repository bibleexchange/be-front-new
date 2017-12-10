import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';
import Loading from '../ListWidget/Loading'
//import SoundCloudPlayer from './SoundCloudPlayer'
import NoteEditor from '../NoteEditor/NoteEditorWidget'
import './Dock.scss';
import NoteOptions from '../Note/NoteOptions';
import NotesWidget from '../Note/NotesWidget';
import MagnifyingGlass from '../Svg/MagnifyingGlass';
import Bookmark from '../Bookmark/BookmarkComponent';

class Search extends React.Component {

  render() {
    let that = 'p';
    return (
      <form id='main-search' onSubmit={this.props.searchIt} >
        <input id='search-text' type='text' name='search' placeholder='search notes...' onChange={this.props.handleUpdateSearch} />
          <button onClick={this.props.searchIt}>&nbsp;
            <MagnifyingGlass />
          </button>
      </form>
    );
  }

}

class Dock extends React.Component {

  componentWillMount() {
    this.state = {
      filterBy: this.props.notesWidget.filter
    };
  }

    render() {
    let status = this.props.status
    let playStatus = null
    let notepadButton = null
    let notepadMain = null
    let audioButton = null
    let verseButton = null
    let verseMain= null
    let audioMain = null
    let shareMain = null
    let shareButton = null

        if (this.props.user.authenticated){
            notepadButton = <li className={"menu-"+ status.notepad}><button onClick={this.props.showInDockMenu} data-name="notepad">notepad</button></li>
            notepadMain =  <li id="notepad"  className={"main-"+ status.notepad}> <NoteEditor myNotesWidget={this.props.myNotesWidget} handleUpdateMyNoteFilter={this.props.handleUpdateMyNoteFilter} handleUpdateNote={this.props.handleUpdateNote} moreNotes={this.props.moreMyNotes} user={this.props.user} note={this.props.note} notes={this.props.myNotes} handleEditThis={this.props.handleEditThisNote}/> </li>
        }else{
            notepadButton = null
            notepadMain = null
        }

    if(this.props.player.playStatus === true){
            playStatus = '(!)'
    }

    if(this.props.player === undefined || this.props.player === null || this.props.player.playStatus === false){
      audioButton = null
      audioMain = null
    }else{
      audioButton = <li id="audio-player" className={"menu-"+ status.soundcloud}><button onClick={this.props.showInDockMenu} data-name="soundcloud">audio {playStatus}</button></li>
      //audioMain =  <li id="soundcloud"  className={"main-"+ status.soundcloud}><SoundCloudPlayer id={this.props.player.currentSoundId} status={this.props.player.playStatus} handleCloseAudio={this.props.handleCloseAudio}/></li>
    }

    if(this.props.bibleVerse === undefined || this.props.bibleVerse === null || this.props.bibleVerse.reference === null){
      verseButton = null
      verseMain = null
    }else{
      verseButton = <li id="verse" className={"menu-"+ status.verse}><button onClick={this.props.showInDockMenu} data-name="verse">{this.props.crossReferences.edges.length} related verses ({this.props.bibleVerse.reference})</button></li>
      verseMain =  <li id="verse"  className={"main-"+ status.verse}>{this.renderVerse()}</li>
    }

      shareButton = <li id="share" className={"menu-"+ status.share}><button onClick={this.props.showInDockMenu} data-name="share">share</button></li>
      shareMain =  <li id="share"  className={"main-"+ status.share}> <NoteOptions note={this.props.note} user={this.props.user} editThisNote={this.props.handleEditThisNote} location={this.props.location}/></li>

      let notesButton = <li id="notes" className={"menu-"+ status.notes}><button onClick={this.props.showInDockMenu} data-name="notes">{this.props.notesWidget.filter} ({this.props.notes.totalCount} notes)</button></li>
      let notesMain =  <li id="notes"  className={"main-"+ status.notes}>{this.renderNotes()}</li>

        return (
            <div id='dock-widget'>

                <div id="dock-main">

                    <nav id="dock-menu">
                        <ul>
                            {audioButton}
                            {notepadButton}
                            {shareButton}
                            {verseButton}
                            {notesButton}
                        </ul>
                    </nav>

                    <ul className="main">
                        {shareMain}
                        {audioMain}
                        {notepadMain}
                        {verseMain}
                        {notesMain}
                    </ul>

                </div>

            </div>
        );
    }

    renderNotes(){

      return (<NotesWidget
                status={this.props.notesWidget}
                notes={this.props.notes}
                selectNote={this.props.handleEditThisNote}
                handleUpdateNoteFilter={this.props.handleUpdateNoteFilter}
                handleNextNotePage={this.props.handleNextNotePage}
                handleNotesAreReady={this.props.handleNotesAreReady}
                user={this.props.user}
              />)

    }

     renderVerse(){

      let cr = []

      if(this.props.crossReferences !== undefined && this.props.crossReferences.edges !== undefined){
        cr = this.props.crossReferences.edges
      }

      return ( <span>
            <p>
            <strong> {this.props.reference} cross references: </strong>
            {cr.map(function(c){
              let verses = ''
              c.node.verses.edges.map(function(v){
                verses += v.node.order_by + " " + v.node.body + " "
              })

              return <Link key={c.node.id} to={c.node.url} title={verses} >| {c.node.reference} </Link>;
            })}
            </p>

              </span>)

    }

}

Dock.propTypes = {
  user: React.PropTypes.object.isRequired,
  note: React.PropTypes.object,
  notes: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

Dock.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default createFragmentContainer(Dock, {
    note: ()=> Relay.QL`fragment on Note {
              ...NoteEditor_note
              ...NoteOptions_note
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
    user: graphql`
    fragment Dock_user on User {
      ...NoteOptions_user
      ...NotesWidget_user
      authenticated
      name
      email
      ...NoteEditor_user
    }
  `,

  bibleVerse: () => Relay.QL`fragment on BibleVerse {
            id
            reference
            notesCount
    }`,

crossReferences: () => Relay.QL`fragment on CrossReferenceConnection {
              pageInfo{hasNextPage}
              edges{
                  node {
                  id
                  url
                  reference
                        verses(first:50){
                          edges{
                            node{
                              id
                              order_by
                              body
                            }
                          }
                        }
                      }

                  }
              }`,

  notes: graphql`
    fragment Dock_notes on NoteConnection {
          ...NotesWidget_notes
          pageInfo{hasNextPage}
          totalCount
          totalPagesCount
          currentPage
          edges{
              node {
                  id
                  title
                  verse {id, reference}
              }
    }
    }`,

});
