import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class MyAccount extends React.Component {

  render() {

    return (<div>
              <h1>My Account (<em>{this.props.user.name}</em>)</h1>

              <p>EMAIL: {this.props.user.email}</p>

      </div>)
  }

}

MyAccount.propTypes = {
    viewer: React.PropTypes.object.isRequired
};

MyAccount.defaultProps = {
}

export default Relay.createContainer(MyAccount, {
  fragments: {
      user: () => Relay.QL`fragment on User {
          id
          authenticated
      }`

  },
});
