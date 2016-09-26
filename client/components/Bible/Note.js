import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Note extends React.Component {

  render() {

    let n = this.props.note.properties;

    let resourceButton =  null;

    if (n.resourceUrl !== null){
      //resourceButton =   <button style={{float:"right"}} onClick={this.handleOembed.bind(this)}>{this.state.status}</button>;
    }

	return (
		<div className="bible-note" >
      {resourceButton}
			<p>{n.text}</p>
			<p>{n.tags.map(function(t){return " #"+t})}</p>
			<p><Link to={"/users/" + this.props.note.author.id}>{this.props.note.author.name}</Link></p>

		</div>
		);
	}

}

export default Relay.createContainer(Note, {
  fragments: {
    note: () => Relay.QL`
      fragment on Note  {
        id
        next {
          id
        }
        note {
          output {
            id
            type
            api_request
            body
          }
        }
        previous {
          id
        }
  	   author {
  	    id
  	    name
  	    }
     }`
  }
});
