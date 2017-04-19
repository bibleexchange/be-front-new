import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Expand from '../Svg/Expand'
class UserLoggedOut extends React.Component {

  render() {
    let Login = null;
    let Signup = null;

    if (this.props.online) {
      Login = <li><button onClick={this.props.handleLoginStatus} >Login</button></li>;
      Signup = <li><button onClick={this.props.handleSignUpStatus} >Signup</button></li>;
    }

    return (
    		<ul>
          {Login}
          {Signup}
              <li>
                <button id="open-close" onClick={this.props.handleOpenCloseDock}><Expand /></button>
              </li>
            </ul>
    );
  }

}

UserLoggedOut.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default Relay.createContainer(UserLoggedOut, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        authenticated
      }
    `,
  },
});
