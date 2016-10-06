import React from 'react';
import Relay from 'react-relay';

class UserLoggedIn extends React.Component {

  render() {
	let user = this.props.user;

    return (
    <ul>
		<li>
		  <button onClick={this.props.handleLogout}>
			{user.name}	(Logout)
		  </button>
		</li>
		<li>
		  <button onClick={this.props.handleBookmark}>
			   bookmark
		  </button>
		</li>
	 </ul>
    );
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
