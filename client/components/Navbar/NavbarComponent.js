import React from 'react';
import { Link } from 'react-router';
import './Navbar.scss';
import BeLogo from '../Svg/BeLogo';
import Relay from 'react-relay';

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
		
	if(viewer.authenticated) {
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

Navbar.propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

export default Relay.createContainer(Navbar, {
  initialVariables: {
	slug:''
  }, 
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
	id
	email	
	name
	authenticated
      }
    `,
  },
});
