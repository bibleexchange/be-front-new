import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import NoteUpdater from '../Note/NoteUpdater';

class NoteEditorComponent extends React.Component {

  render() {

    return (
      <div className="WidgetContainer">
            <div className="Widget">
              <NoteUpdater viewer={this.props.viewer} bibleVerse={this.props.viewer.bibleVerse} note={this.props.viewer.note}/>
            </div>
      </div>
    )
  }

  clickVerseBody(e){
    if(this.props.viewer.user.authenticated === "true"){
      this.setState({noteStatus: !this.state.noteStatus});
    }
  }

  clearVerseForm(e){
    this.setState({noteStatus: false});
  }

}

export default Relay.createContainer(NoteEditorComponent, {
  initialVariables: {
    bibleVerseId: "QmlibGVWZXJzZTo0MzAwMzAwNg==",
    noteId:"stringid"
  },
  fragments: {
  viewer: () => Relay.QL`
      fragment on Viewer  {
        user{authenticated}
        ${NoteUpdater.getFragment('viewer')}
        bibleVerse(id:$bibleVerseId){
          ${NoteUpdater.getFragment('bibleVerse')}
        }
        note(id:$noteId){
          ${NoteUpdater.getFragment('note')}
          id
          type
          author{
            name
          }
          body
          tags_string
        }
     }`
  },

});
