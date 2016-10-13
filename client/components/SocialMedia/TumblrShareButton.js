import React from 'react';
import { Link } from 'react-router';

import './SocialMedia.scss';

export default class TumblrShareButton extends React.Component {
  render() {
  	return (
      <a className="tumblr-share-button"
        target="_blank"
        data-color="white"
        data-notes="right"
        href="https://embed.tumblr.com/share">
      Tumblr
      </a>
  		);
	}

}
