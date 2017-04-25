import React from 'react';
import './Footer.scss';
import Relay from 'react-relay';

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

export default Relay.createContainer(Footer, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        authenticated
      	name
      }
    `,
  },
});
