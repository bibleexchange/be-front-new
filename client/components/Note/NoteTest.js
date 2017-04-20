import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import ExternalLink from './Output/ExternalLinkNote';
import Recording from './Output/RecordingNote';
import BibleVerse from './Output/BibleVerse';
import DCRecording from './Output/DCRecording';
import NoteFile from './Output/NoteFile';
import marked from 'marked';
import N from '../../NoteTypes';

class NoteTest extends React.Component {
  render() {
    return <div>{this.noteTest()}</div>;
  }

  noteTest(){

    let component = null;
    let note = this.props.note

    switch (this.props.type) {

      case N.GITHUB:
        component = <div dangerouslySetInnerHTML={{ __html: this.props.body}} ></div>;
        break;

      case N.BIBLE_VERSE:
        component = <BibleVerse bibleVerse={this.props.value} request={this.props.api_request} fullReference={true}/>;
        break;

      case N.STRING:
        component = <div dangerouslySetInnerHTML={{ __html: note.output.body }} ></div>;
        break;

      case N.MARKDOWN:
        component = <div dangerouslySetInnerHTML={{ __html: marked(JSON.parse(this.props.value)) }} ></div>;
        break;

      case N.FILE:
        component = <NoteFile note={note} viewer={this.props.viewer} />;
        break;

      case N.DC_RECORDING:
        let recording = null

        if(this.props.value !== undefined){
            console.log(this.props.value)
          recording = JSON.parse(this.props.value);
        }else{
          recording = JSON.parse(note.output.body);

          if (this.props.api_request === false) { recording.body = JSON.parse(recording.body); }
        }
        component = <DCRecording recording={recording} request={this.props.api_request} note={note} viewer={this.props.viewer} />;

        break;

        case N.JSON:
            component = <NoteFile note={note} viewer={this.props.viewer} />;
            break;

      default:
        component = note.output.body;

    }
    return component;
  }

}

NoteTest.propTypes = {
  type: React.PropTypes.string.isRequired,
  body: React.PropTypes.object.isRequired,
  api_request: React.PropTypes.string.isRequired
};

export default Relay.createContainer(NoteTest, {
  initialVariables: {
    noteId: '55555',
  },
  fragments: {
    user: () => Relay.QL`fragment on User {
      ${DCRecording.getFragment('user')}
        authenticated
    }`,
    note: () => Relay.QL`fragment on Note {
        ${DCRecording.getFragment('note')}
      id
      title
      tags
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
