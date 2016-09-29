import React from 'react';
import Relay from 'react-relay';
import LoginComponent from '../Login/LoginComponent';
import { Link } from 'react-router';

class UserLoggedOut extends React.Component {

  componentWillMount(){
    this.state = {
      closed : true
    };
  }

  render() {

    return (
		<ul>
			<li><button onClick={this.handleLogin.bind(this)} onMouseEnter={this.handleLogin.bind(this)}>Login</button></li>
			<li><Link to="/signup">Signup</Link></li>

      <LoginComponent status={this.state.closed} handleStatus={this.handleLogin.bind(this)} user={this.props.user} />

		</ul>
    );
  }

  handleLogin(){
    let status = this.state.closed;
    this.setState({closed:status? false:true});
  }

}

UserLoggedOut.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default Relay.createContainer(UserLoggedOut, {
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
        ${LoginComponent.getFragment('user')}
      }
    `,
  },
});
