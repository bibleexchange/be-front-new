import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class NotePreview extends React.Component {

  render() {

  	return (
  		<div className="note-preview" >
  			<p><Link to={"/notes/"+this.props.note.id}> {this.props.note.id} {this.props.note.output.type}</Link></p>
  			<p>{this.props.note.tags.map(function(t){return " #"+t})}</p>
  			<p><Link to={"/users/" + this.props.note.author.id}>{this.props.note.author.name}</Link></p>

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
