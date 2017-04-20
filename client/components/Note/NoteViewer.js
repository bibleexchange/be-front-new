import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import NoteTest from './NoteTest';

class NoteViewer extends React.Component {
  render() {
    let component = null;

    if (this.props.note !== null && this.props.note !== undefined && this.props.note !== '') {
      component = <NoteTest type={this.props.note.output.type} note={this.props.note} api_request={this.props.note.api_request} />
    } else {
      component = <h1>This note does not exist. Try <Link to={"/notes"}>searching</Link> for something else.</h1>
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
  fragments: {
    user: () => Relay.QL`fragment on User {
        authenticated
    }`,
    note: () => Relay.QL`fragment on Note {
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
