import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import './Navbar.scss';
import { Navbar } from 'react-bootstrap';
import BeLogo from '../Svg/BeLogo';

class MainNavbar extends React.Component {
  render() {

    return (
      	  <Navbar animated staticTop fluid style={{marginBottom: 0}}>
			<Navbar.Header pullLeft>
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span> 
				</button>
			  <Navbar.Brand>
				<Link to="/">
					<BeLogo/>
				</Link>
			  </Navbar.Brand>
			</Navbar.Header>
			<div className="collapse navbar-collapse pull-right" id="myNavbar">
				<UserSessionControl url={this.props.location.pathname} user={this.props.viewer} route={this.props.route}/>
			</div>
		 </Navbar>
    );
  }
}

class UserLoggedIn extends React.Component {
  
  render() {  
	let user = this.props.user;

    return (
    <Nav bsStyle="pills" activeKey={0} onSelect={this.handleSelect} >
	
		<NavItem eventKey={2} title="Item" className="btn btn-default navbar-btn" onClick={this.props.handleLogout}>
			{user.username}	(Logout)
		</NavItem>
		
		<NavItem eventKey={1} title="Item" className="btn btn-default navbar-btn"  onClick={this.handleBookMark.bind(this)}>
			<span className="glyphicon glyphicon-bookmark"></span>
		</NavItem>
		
	 </Nav>
    );
  }
  
    handleBookMark(event) {
		console.log('I would like a book mark feature sometime soon! ',this.props.user.__dataID__, this.props.url);
	}
  
}

class UserLoggedOut extends React.Component {
  render() {
    return (
		<Nav activeKey={1} onSelect={this.handleSelect} >
			<li eventKey={1} href="/home"><Link to="/login">Login</Link></li>
			<li eventKey={2} title="Item"><Link to="/signup">Signup</Link></li>
		  </Nav>
    );
  }
  
    handleSelect(selectedKey) {
	  alert('selected ' + selectedKey);
	}
	
} 

class UserSessionControl extends React.Component {
	
  render() {
    return (this.getSessionStuff(this.props.user, this.props.url));
  }
	
	getSessionStuff(user,url) {
		console.log('deciding session stuff based on: ', user);
		if (user) {
			return <UserLoggedIn url={url} user={user} handleLogout={this.handleLogout.bind(this)}/>;
		}else {
		   return <UserLoggedOut />;
		}
	}
	
  handleLogout(e) {
	e.preventDefault();
	console.log('You should really build a way to log me out!');
  }
  
}

MainNavbar.propTypes = {
    viewer: React.PropTypes.object.isRequired,
  };

export default MainNavbar;