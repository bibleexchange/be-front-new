import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';

class LogOut extends React.Component {

  componentWillMount(){
    this.props.handleLogout('/me')
  }

  render() {

    return (null)
  }

}

export default createFragmentContainer(LogOut, {
    user: () => Relay.QL`fragment on User {
        id
        authenticated
        email
    }`

});
