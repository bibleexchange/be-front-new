import React from 'react';
import Relay from 'react-relay';
import ExternalLink from './ExternalLinkNote';
import Recording from './RecordingNote';
import BibleVerse from './Output/BibleVerse';
import marked from 'marked';

class NoteViewer extends React.Component {
  render() {

    let component = null;
    let note = this.props.note;

// type, api_request, body
    switch(note.output.type){

      case "GITHUB":
        component = <div dangerouslySetInnerHTML={{__html: this.props.note.note.output.body}} ></div>;
        break;

      case "BIBLE_VERSE":
        let verse = JSON.parse(note.output.body);
        component = <BibleVerse bibleVerse={verse} request={note.api_request}/>;
        break;

      case "STRING":
        component = <div dangerouslySetInnerHTML={{__html: note.output.body}} ></div>;
        break;

      case "MARKDOWN":
        component = <div dangerouslySetInnerHTML={{__html: marked(note.output.body)}} ></div>;
        break;

      default:
        component = this.props.note.note.output.body;

    }

    console.log(note);

    return (
        <div style={{padding:"15px"}}>
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
      note: () => Relay.QL`fragment on Note {
        id
        output{
          type
          api_request
          body
        }
      }`,
    },
});
