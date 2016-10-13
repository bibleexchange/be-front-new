import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

import FacebookShareButton from '../SocialMedia/FacebookShareButton';
import TumblrShareButton from '../SocialMedia/TumblrShareButton';
import TwitterShareButton from '../SocialMedia/TwitterShareButton';
import PinterestShareButton from '../SocialMedia/PinterestShareButton';
import GooglePlusShareButton from '../SocialMedia/GooglePlusShareButton';

import './NoteOptions.scss';

const shareIcon = require('../../assets/svg/share.svg');

class NoteOptions extends React.Component {

  componentWillMount(){
    this.state = {
      status: false
    };
  }

  render() {

    let shareURL = "notes/"+this.props.note.id;
    let mainStyle = {display:"none"};
    if(this.state.status){
      mainStyle.display = "block";
    }

  	return (
  		<nav id="note-options-menu" >
        <ul style={mainStyle} >
          <li><Link to={"/notes/"+this.props.note.id+"/edit"} className="view-it">edit</Link></li>
          <li><FacebookShareButton url={shareURL}/></li>
          <li><TwitterShareButton ur={shareURL}/></li>
          <li><PinterestShareButton url={shareURL} /></li>
          <li><GooglePlusShareButton url={shareURL} /></li>
          <li><TumblrShareButton /></li>
        </ul>
        <div id="shareIcon">
          <img src={shareIcon} onClick={this.toggleSocial.bind(this)}/>
          (share)
        </div>
  		</nav>
  		);
	}

  toggleSocial(e){
    this.setState({status: !this.state.status});
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
