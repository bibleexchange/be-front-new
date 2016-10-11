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
	console.log('deciding session stuff based on: 1) User is Loggedin--'+ this.props.loggedIn, '& 2) User is online--'+  this.props.online);

	if(this.props.loggedIn === true) {
	  inOrOut = <UserLoggedIn
      loggedIn={this.props.loggedIn}
      handleLogout={this.props.handleLogout}
      message={this.state.message}
      url={url} user={user}
      handleBookmark={this.props.handleBookmark}
      online={this.props.online}
      navs={this.props.navs}
      />;
	}else {
	  inOrOut = <UserLoggedOut
      loggedIn={this.props.loggedIn}
      handleLogin={this.props.handleLogin}
      handleSignUp={this.props.handleSignUp}
      message={this.state.message}
      user={this.props.user}
      UpdateLoginEmail={this.props.UpdateLoginEmail}
      UpdateLoginPassword={this.props.UpdateLoginPassword}
      handleEditSignUpEmail={this.props.handleEditSignUpEmail}
      handleEditSignUpPassword={this.props.handleEditSignUpPassword}
      handleEditSignUpPasswordConfirm={this.props.handleEditSignUpPasswordConfirm}
      online={this.props.online}
      signup={this.props.signup}
      />;
	}

    return (
    	<header id="MainNavbar">
				<nav id="BrandNav">
					<Link to="/">
						<BeLogo />
            <span className="brandName">Bible exchange</span>
            <sup className="beta">beta 2.0</sup>
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
