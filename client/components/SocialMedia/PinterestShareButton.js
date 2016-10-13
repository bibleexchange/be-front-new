import React from 'react';
import { Link } from 'react-router';

import './SocialMedia.scss';

export default class PinterestShareButton extends React.Component {
  render() {
  	return (
      <a
        href="https://www.pinterest.com/pin/create/button/"
        data-pin-media="https://bible.exchange/images/be_logo.png"
        data-pin-url={"https://bible.exchange/"+this.props.url}
        data-pin-count="beside"
        data-pin-custom="true"
      >
        <img style={{height:"30px"}} src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_gray_20.png" />
      </a>
  		);
	}

}
