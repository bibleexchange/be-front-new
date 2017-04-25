import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import NoteTest from './NoteTest';

class NoteViewer extends React.Component {
  render() {
    let component = <h1>This note does not exist. Try <Link to={"/notes"}>searching</Link> for something else.</h1>;

    let textVerse = null

        if(this.props.note.verse !== undefined){
          textVerse = <div dangerouslySetInnerHTML={{ __html: this.props.note.verse.quote }} ></div>
        }

    if (this.props.note !== null && this.props.note !== undefined && this.props.note !== '') {
      component = <div>

          {textVerse}
        <p>'{this.props.note.title}' Noted by {this.props.note.author.name}</p>
        <hr/>
        <NoteTest type={this.props.note.output.type} body={this.props.note.output.body}  api_request={this.props.note.output.api_request} note={this.props.note} full={true}/>
        </div>
    }

    return (
          <div>{component}</div>
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
        quote
      }
      output{
        type
        api_request
        body
      }
    }`,
  },
});
