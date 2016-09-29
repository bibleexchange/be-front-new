import React from 'react';
import { Link } from 'react-router';
import './Navbar.scss';
import BeLogo from '../Svg/BeLogo';
import Relay from 'react-relay';

import UserLoggedOut from './UserLoggedOut';
import UserLoggedIn from './UserLoggedIn';

class Navbar extends React.Component {

  componentWillMount(){
    this.state = {
      message : ''
    };
  }

  render() {

	let user = this.props.user;
	let url = this.props.location.pathname;
	let inOrOut = 'loading...';
	console.log('deciding session stuff based on: ', user, this.state.online);

	if(user !== null && user.authenticated && user.authenticated !== "false") {
	  inOrOut = <UserLoggedIn message={this.state.message} url={url} user={user} />;
	}else {
	  inOrOut = <UserLoggedOut message={this.state.message} user={this.props.user}/>;
	}

    return (
    	<header id="MainNavbar">
				<nav id="BrandNav">
					<Link to="/">
						<BeLogo/>
					</Link>
				</nav>
				<nav id="UserNav">
					{inOrOut}
				</nav>
		 	</header>
    );
  }

}

Navbar.propTypes = {
    user: React.PropTypes.object.isRequired,
	location: React.PropTypes.object.isRequired,
  };

export default Relay.createContainer(Navbar, {
  initialVariables: {
	slug:''
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
      	id
        token
      	email
      	name
      	authenticated
        ${UserLoggedIn.getFragment('user')}
        ${UserLoggedOut.getFragment('user')}
      }
    `,
  },
});
