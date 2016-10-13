import React from 'react';
import { Link } from 'react-router';

import './SocialMedia.scss';

export default class GooglePlusShareButton extends React.Component {
  render() {
  	return (
      <div className="g-plusone" data-href={"http://bible.exchange/"+this.props.url}></div>
  		);
	}

}
