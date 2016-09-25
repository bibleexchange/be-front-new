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
			   {this.props.message} bookmark
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

  componentWillMount(){
    this.state = {
      message : ''
    };
  }

  render() {

	let user = this.props.user;
	let url = this.props.location.pathname;
	let inOrOut = 'loading...';
	//console.log('deciding session stuff based on: ', user);

	if(user.authenticated) {
		inOrOut = <UserLoggedIn message={this.state.message} url={url} user={user} handleLogout={this.handleLogout.bind(this)} handleBookMark={this.handleBookMark.bind(this)}/>;
	}else {
	   inOrOut = <UserLoggedOut message={this.state.message}/>;
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
	console.log('I would like a book mark feature sometime soon! ', this.props.location.pathname);

    if(this.props.location.pathname !== null){
      let navs = JSON.parse(localStorage.getItem('navs'));

      if (navs == null){
        navs = [];
      }

      navs.unshift(this.props.location.pathname);
      localStorage.setItem('navs', JSON.stringify(navs));

      this.props.handleUpdateBookmarks(navs);

      this.setState({message:'bookmarked'});
      var that = this;
      setTimeout(function(){that.setState({message:''}); }, 1500);
    }

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
      	email
      	name
      	authenticated
      }
    `,
  },
});
