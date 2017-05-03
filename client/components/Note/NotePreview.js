import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import N from '../../NoteTypes';

import DCRecording from './Preview/DCRecording';
import BibleVerse from './Preview/BibleVerse';

import marked from 'marked';

class NotePreview extends React.Component {

  render() {
    let note = this.props.note;
    let component = null;
console.log(note, 9999)

    switch (note.output.type) {

      case N.GITHUB:
        component = <div dangerouslySetInnerHTML={{ __html: note.output.body }} ></div>;
        break;

      case N.BIBLE_VERSE:
        let verse = JSON.parse(note.output.body);
        component = <BibleVerse bibleVerse={verse} request={note.api_request} />;
        break;

      case N.STRING:
        component = <div dangerouslySetInnerHTML={{ __html: note.output.body }} ></div>;
        break;

      case N.MARKDOWN:
        component = <div dangerouslySetInnerHTML={{ __html: marked(note.output.body).substring(0, 400) }} ></div>;
        break;

      case N.DC_RECORDING:
        if (typeof note.output.body === 'string' || note.output.body instanceof String) {
          note.output.body = JSON.parse(note.output.body);
        }
        component = <DCRecording note={note} />;
        break;

      default:
        component = <div><p><Link to={'/notes/' + this.props.note.id}> {this.props.note.id} {this.props.note.output.type}</Link></p><p>{this.props.note.tags.map(function (t) { return ' #' + t; })}</p><p><Link to={'/users/' + this.props.note.author.id}>{this.props.note.author.name}</Link></p></div>;
    }
                                                                            return (
  		<div className='note-preview' style={{ margin: '15px' }}>
      <button id='delete' >&#10008; CREATE FUNCTION TO DISMISS/CLOSE PREVIEW</button>
        <Link to={'/notes/' + this.props.note.id} style={{ width: '100%', height: '25px', display: 'block', textAlign: 'center', color: 'white', backgroundColor: 'rgba(0,0,0,.2)' }}>GO</Link>
  		  {component}
  		</div>
  		);
	                                                                                                    }

}

export default Relay.createContainer(NotePreview, {
  fragments: {
    note: () => Relay.QL`
      fragment on Note  {
          id
          tags
          verse{
            id
            url
            reference
          }
          output {
            id
            type
            api_request
            body
          }
    	   author {
    	    id
    	    name
    	    }
     }`
  }
});
