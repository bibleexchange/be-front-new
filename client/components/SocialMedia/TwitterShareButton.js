import React from 'react';
import { Link } from 'react-router';

import './SocialMedia.scss';

export default class TwitterShareButton extends React.Component {
  render() {

  	return (
      <a href="https://twitter.com/share"
        className="twitter-share-button"
        target="_BLANK"
        data-url={this.props.url}
        data-via="bible_exchange"
        data-hashtags="bible_exchange"
        data-show-count="true">
        Tweet</a>
  		);
	}

}
