import React from 'react';
import { Link } from 'react-router';

import './SocialMedia.scss';

export default class FacebookShareButton extends React.Component {
  render() {

    let href = this.props.url;
    let dataHref = href;

  	return (
      <div
        className="fb-share-button"
        data-href={"/"+dataHref}
        data-layout="button_count"
        data-size="large"
        data-mobile-iframe="true">
        <Link className="fb-xfbml-parse-ignore"
          target="_blank"
          to={"https://www.facebook.com/sharer/sharer.php?u"+href}>
          Facebook
        </Link>
      </div>
  		);
	}

}
