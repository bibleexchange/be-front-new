import React from 'react';
import { Link } from 'react-router';
import './Navbar.scss';
import BeLogo from '../Svg/BeLogo';
import Relay from 'react-relay';
import UserLoggedOut from './UserLoggedOut';
import UserLoggedIn from './UserLoggedIn';

class Navbar extends React.Component {

  componentWillMount() {
    this.state = {};
  }

render() {
    let url = this.props.location.pathname;
    let inOrOut = 'loading...';
    let loggedIn = false;

    if (this.props.user !== null) {
      loggedIn = this.props.user.authenticated;
    }

console.log('deciding session stuff based on: 1) User is Loggedin--' + loggedIn, '& 2) User is online--' + this.props.online);

if (loggedIn === true) {
inOrOut = <UserLoggedIn
loggedIn={loggedIn}
handleLogout={this.props.handleLogout}
message={this.state.message}
url={url} user={this.props.user}
online={this.props.online}
handleOpenCloseDock={this.props.handleOpenCloseDock}
handleBookmark={this.props.handleBookmark}
/>;
} else {
inOrOut = <UserLoggedOut
loggedIn={loggedIn}
user={this.props.user}
handleOpenCloseDock={this.props.handleOpenCloseDock}
/>;
}

    return (
    	<header id='MainNavbar'>
				<nav id='BrandNav'>
					<Link to='/'>
						<BeLogo />
            <span className='brandName'>Bible exchange</span>
            <sup className='beta'>beta 2.0</sup>
					</Link>
				</nav>
        <nav id='UserNav'>{inOrOut}</nav>

		 	</header>
    );
  }

}

Navbar.propTypes = {
  user: React.PropTypes.object.isRequired,
	                                                                                                    location: React.PropTypes.object.isRequired,
};

Navbar.defaultProps = {
  user: { 'name': 'Guest', 'authenticated': false }
};

export default Relay.createContainer(Navbar, {
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
        ${UserLoggedOut.getFragment('user')}
      }
    `,
  },
});
