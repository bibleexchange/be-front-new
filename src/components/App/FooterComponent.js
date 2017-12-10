import React from 'react';
import './Footer.scss';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';

import './Footer.scss';

class Footer extends React.Component {

  render() {
    let usingAs = "Guest"
    if(this.props.user.authenticated){
        usingAs = this.props.user.name
    }

    return (
	   <p>Using Bible exchange as {usingAs}</p>
    );
  }
}

Footer.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(Footer, {
  user: graphql`
    fragment FooterComponent_user on User {
      authenticated
      name
    }
  `,
});
