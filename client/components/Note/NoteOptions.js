import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import SocialShareButton from '../SocialMedia/SocialShareButton';

import './NoteOptions.scss';

const shareIcon = require('../../assets/svg/share.svg');

class NoteOptions extends React.Component {

  render() {
    let shareURL = this.props.location.pathname.replace('/','');
    let editNote = null;

    if (this.props.note !== undefined && this.props.note !== null && this.props.user !== undefined) {
      editNote = <li><SocialShareButton site='edit' url={null} data={this.props.note} handle={this.props.editThisNote}/></li>;
    }

  	 return (
  		<nav id='note-options-menu' >
        <ul className="note-options">
          {editNote}
          <li><SocialShareButton site='print' url={'/notes/' + this.props.note.id + '/print'} /></li>
          <li><SocialShareButton site='facebook' url={shareURL} /></li>
          <li><SocialShareButton site='twitter' message='Discover this and more on Bible.exchange' url={shareURL} /></li>
          <li><SocialShareButton site='googleplus' url={shareURL} /></li>
          <li><SocialShareButton site='pinterest' media='' message='Discover this and more on Bible.exchange' url={shareURL} /></li>
        </ul>

  		</nav>
  		);
	  }
}

export default Relay.createContainer(NoteOptions, {
  fragments: {
    user: () => Relay.QL`fragment on User {
        authenticated
    }`,
    note: () => Relay.QL`
      fragment on Note  {
          id
          title
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
