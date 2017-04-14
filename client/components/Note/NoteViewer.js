import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import NoteTest from './NoteTest';

class NoteViewer extends React.Component {
  render() {
    let component = null;
    let note = this.props.note;

    if (note !== null && note !== '') {
      component = <NoteTest type={note.output.type} note={note} api_request={note.api_request} />;
    } else {
      component = <h1>This note does not exist. Try <Link to={"/notes"}>searching</Link> for something else.</h1>;
    }
    return (
        <div style={{ padding: '10px', wordWrap: 'break-word' }}>
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
   noteId: '55555',
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      user {
        authenticated
      }
    }`,
    note: () => Relay.QL`fragment on Note {
      id
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
