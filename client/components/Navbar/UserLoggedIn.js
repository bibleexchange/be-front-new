import React from 'react';
import Relay from 'react-relay';

class UserLoggedIn extends React.Component {

  render() {

    return (
    <ul>
  		<li><button id="sign-out" onClick={this.props.handleLogout} />
  		</li>
  		<li><button id='bookmark-it' onClick={this.props.handleBookmark} />
  		</li>
      <li>{this.props.openClose}</li>
	  </ul>
    );
  }

}

UserLoggedIn.propTypes = {
  handleLogout: React.PropTypes.func.isRequired,
  handleBookmark: React.PropTypes.func.isRequired,
  handleOpenCloseDock: React.PropTypes.func.isRequired
};

export default UserLoggedIn;
