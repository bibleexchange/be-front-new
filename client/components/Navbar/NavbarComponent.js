import React from 'react';
import { Link } from 'react-router';
import './Navbar.scss';
import BeLogo from '../Svg/BeLogo';
import Relay from 'react-relay';
import UserLoggedOut from './UserLoggedOut';
import UserLoggedIn from './UserLoggedIn';
import Expand from '../Svg/Expand'
import Minimize from '../Svg/Minimize'

class Navbar extends React.Component {

render() {
    let url = this.props.location.pathname;
    let inOrOut = null;
    let loggedIn = this.props.user.authenticated

    let toggle = null

    if(this.props.dockStatus){
      toggle = <Minimize />
    }else{
      toggle = <Expand />
    }

    let OpenClose = <button id="open-close" onClick={this.props.handleOpenCloseDock}>{toggle}</button>

if (loggedIn === true) {
inOrOut = <UserLoggedIn
          loggedIn={loggedIn}
          handleLogout={this.props.handleLogout}
          message={this.props.message}
          url={url} user={this.props.user}
          online={this.props.online}
          openClose={OpenClose}
          handleBookmark={this.props.handleBookmark}
          />
} else {
inOrOut = <UserLoggedOut
          loggedIn={loggedIn}
          user={this.props.user}
          handleOpenCloseDock={this.props.handleOpenCloseDock}
          openClose={OpenClose}
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

export default Relay.createContainer(Navbar, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
      	authenticated
        ${UserLoggedOut.getFragment('user')}
      }
    `,
  },
});
