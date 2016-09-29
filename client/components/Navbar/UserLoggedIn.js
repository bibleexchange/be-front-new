import React from 'react';
import Relay from 'react-relay';

class UserLoggedIn extends React.Component {

  render() {
	let user = this.props.user;

    return (
    <ul>
		<li>
		  <button onClick={this.handleLogout.bind(this)}>
			{user.username}	(Logout)
		  </button>
		</li>
		<li>
		  <button onClick={this.handleBookMark.bind(this)}>
			   {this.props.message} bookmark
		  </button>
		</li>
	 </ul>
    );
  }

  handleLogout(e) {
  	//e.preventDefault();
  	console.log('You should really build a way to log me out!');
    localStorage.removeItem('be_token');
      window.location.href = '/logout';
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

UserLoggedIn.propTypes = {
    user: React.PropTypes.object.isRequired
  };

export default Relay.createContainer(UserLoggedIn, {
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
        token
      }
    `,
  },
});
