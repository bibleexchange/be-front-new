import React from 'react';
import './Footer.scss';
import Relay from 'react-relay';

import './Footer.scss';

class Footer extends React.Component {

  render() {
		let usingAs = <a href={this.props.user.email}> {this.props.user.name}</a>;

    return (
	   <center>Using Bible exchange as {usingAs}</center>
    );
  }
}

Footer.propTypes = {
    user: React.PropTypes.object.isRequired,
  };

export default Relay.createContainer(Footer, {
  initialVariables: {
	slug:''
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
      	email
      	name
      	authenticated
      }
    `,
  },
});
