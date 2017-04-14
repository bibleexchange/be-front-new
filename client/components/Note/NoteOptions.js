import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import SocialShareButton from '../SocialMedia/SocialShareButton';

import './NoteOptions.scss';

const shareIcon = require('../../assets/svg/share.svg');

class NoteOptions extends React.Component {

  componentWillMount() {
    this.state = {
      status: false
    };
  }

  render() {
    let shareURL = null;
    let mainStyle = { display: 'none' };
    let editNote = null;

    if (this.state.status) {
      mainStyle.display = 'block';
    }

    if (this.props.note !== null & this.props.viewer.user !== undefined) {
      editNote = <li><SocialShareButton site='edit' url={null} data={this.props.note} handle={this.props.editThisNote}/></li>;
      shareURL = 'notes/' + this.props.note.id;
    }

  	                                                                                                    return (
  		<nav id='note-options-menu' >
        <ul style={mainStyle} >
          {editNote}
          <li><SocialShareButton site='print' url={'/notes/' + this.props.note.id + '/print'} /></li>
          <li><SocialShareButton site='facebook' url={shareURL} /></li>
          <li><SocialShareButton site='twitter' message='waht a great day' url={shareURL} /></li>
          <li><SocialShareButton site='googleplus' url={shareURL} /></li>
          <li><SocialShareButton site='pinterest' media='' message='waht a great day' url={shareURL} /></li>
        </ul>
        <div id='shareIcon'>
          <img src={shareIcon} onClick={this.toggleSocial.bind(this)} />
        </div>
  		</nav>
  		);
	                                                                                                    }

  toggleSocial(e) {
    this.setState({ status: !this.state.status });
  }

}

export default Relay.createContainer(NoteOptions, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      user {
        authenticated
      }
    }`,
    note: () => Relay.QL`
      fragment on Note  {
          id

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
