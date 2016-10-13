import React from 'react';
import Relay from 'react-relay';
import ExternalLink from './Output/ExternalLinkNote';
import Recording from './Output/RecordingNote';
import BibleVerse from './Output/BibleVerse';
import DCRecording from './Output/DCRecording';
import marked from 'marked';
import N from '../../NoteTypes';

class NoteViewer extends React.Component {
  render() {

    let component = null;
    let note = this.props.note;

if(note !== null && note !== ""){
    switch(note.output.type){

      case N.GITHUB:
        component = <div dangerouslySetInnerHTML={{__html: this.props.note.note.output.body}} ></div>;
        break;

      case N.BIBLE_VERSE:
        let verse = JSON.parse(note.output.body);
        component = <BibleVerse bibleVerse={verse} request={note.api_request} />;
        break;

      case N.STRING:
        component = <div dangerouslySetInnerHTML={{__html: note.output.body}} ></div>;
        break;

      case N.MARKDOWN:
        component = <div dangerouslySetInnerHTML={{__html: marked(note.output.body)}} ></div>;
        break;

      case N.DC_RECORDING:
          let recording = JSON.parse(note.output.body);
          if(note.output.api_request === false){recording.body = JSON.parse(recording.body);}

          component = <DCRecording recording={recording} request={note.output.api_request} note={note} viewer={this.props.viewer}/>;

        break;

      default:
        component = note.output.body;

    }
}
    return (
        <div style={{padding:"10px", wordWrap: "break-word"}}>
          {component}
        </div>
    );
  }
}

NoteViewer.propTypes = {
  note: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NoteViewer, {
  initialVariables: {
  	noteId: "55555",
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      ${DCRecording.getFragment('viewer')}
      user {
        authenticated
      }
    }`,
    note: () => Relay.QL`fragment on Note {
        ${DCRecording.getFragment('note')}
      id
    	author{
    	  name
    	}
      verse{
        id
        body
        reference
        url
        notesCount
        order_by
      }
      output{
        type
        api_request
        body
      }
    }`,
    },
});
