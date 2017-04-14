import React from 'react';
import Relay from 'react-relay';
import LoginComponent from '../Login/LoginComponent';
import SignUpComponent from '../Login/SignUpComponent';
import { Link } from 'react-router';

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
                <button id="open-close" onClick={this.props.handleOpenCloseDock}>&nbsp;</button>
              </li>

            </ul>
    );
  }

}

UserLoggedOut.contextTypes = {
  router: React.PropTypes.object.isRequired
};

UserLoggedOut.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default Relay.createContainer(UserLoggedOut, {
  initialVariables: {
	                                                                                                                                                                                                        slug: ''
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
      	id
        token
      	email
      	name
      	authenticated
        ${LoginComponent.getFragment('user')}
        ${SignUpComponent.getFragment('user')}
      }
    `,
  },
});
