import React from 'react';
import Relay from 'react-relay';
import LoginComponent from '../Login/LoginComponent';
import SignUpComponent from '../Login/SignUpComponent';
import { Link } from 'react-router';

class UserLoggedOut extends React.Component {

  componentWillMount(){
    this.state = {
      closed : true,
      signUpStatus: false
    };
  }

  render() {

    let Login = null;

    if(this.props.online){
      Login = <div><li>
        <button onClick={this.handleLoginStatus.bind(this)} >Login</button></li><li>
        <button onClick={this.handleSignUpStatus.bind(this)} >Signup</button></li></div>;
    }

    return (
		<ul>
      {Login}

      <LoginComponent
       status={this.state.closed}
       handleLogin={this.props.handleLogin}
       handleStatus={this.handleLoginStatus.bind(this)}
       user={this.props.user}
       UpdateLoginEmail={this.props.UpdateLoginEmail}
       UpdateLoginPassword={this.props.UpdateLoginPassword}
      />

      <SignUpComponent
       status={this.state.signUpStatus}
       handleEditSignup={this.props.handleEditSignup}
       handleStatus={this.handleSignUpStatus.bind(this)}
       user={this.props.user}
       handleSignUp={this.props.handleSignUp}
      />
		</ul>
    );
  }

  handleLoginStatus(){
    let status = this.state.closed;
    this.setState({closed:status? false:true});
  }

  handleSignUpStatus(){
    let status = this.state.signUpStatus;
    this.setState({signUpStatus:status? false:true});
  }

}

UserLoggedOut.contextTypes = {
    router: React.PropTypes.object.isRequired
};

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
