import React from 'react';
import { Link } from 'react-router';

class DefaultNote extends React.Component {
  render() {	
	
	let note = this.props.data;
	
    return (<div>
					<h2><i className="glyphicon glyphicon-chat"></i> {note.body}</h2>
					<Link to={note.verse.url}>{note.verse.reference}</Link> {note.verse.t}
	   </div>	
    )
  }
 
}

module.exports = DefaultNote;
