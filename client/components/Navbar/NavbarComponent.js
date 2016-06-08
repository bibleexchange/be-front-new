import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import './Navbar.scss';
import BeLogo from '../Svg/BeLogo';

class UserLoggedIn extends React.Component {
  
  render() {  
	let user = this.props.user;

    return (
    <ul>
		<li>
		  <button onClick={this.props.handleLogout}>
			{user.username}	(Logout)
		  </button>
		</li>
		<li>
		  <button onClick={this.props.handleBookMark}>
			<span className="glyphicon glyphicon-bookmark"></span>
		  </button>
		</li>
	 </ul>
    );
  }
  
}

class UserLoggedOut extends React.Component {
  render() {
    return (
		<ul>
			<li><Link to="/login">Login</Link></li>
			<li><Link to="/signup">Signup</Link></li>
		</ul>
    );
  }
  
} 


class Navbar extends React.Component {
  render() {
	
	let viewer = this.props.viewer;
	let url = this.props.location.pathname;
	let inOrOut = 'loading...';
	console.log('deciding session stuff based on: ', viewer);
		
	if(viewer) {
		inOrOut = <UserLoggedIn url={url} user={viewer} handleLogout={this.handleLogout.bind(this)} handleBookMark={this.handleBookMark.bind(this)}/>;
	}else {
	   inOrOut = <UserLoggedOut />;
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
	
  handleLogout(e) {
	e.preventDefault();
	console.log('You should really build a way to log me out!');
  }
  
  handleBookMark(e) {
	e.preventDefault();
	console.log('I would like a book mark feature sometime soon! ',this.viewer.__dataID__, this.props.location.pathname);
  }
  
}

Navbar.propTypes = {
    viewer: React.PropTypes.object.isRequired,
	location: React.PropTypes.object.isRequired,
  };

export default Navbar;