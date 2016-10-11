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
    let Signup = null;

    if(this.props.online){
      Login = <li><button onClick={this.handleLoginStatus.bind(this)} >Login</button></li>;
      Signup = <li><button onClick={this.handleSignUpStatus.bind(this)} >Signup</button></li>;
    }

    return (
    		<ul>
          {Login}
          {Signup}

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
           handleEditSignUpEmail={this.props.handleEditSignUpEmail}
           handleEditSignUpPassword={this.props.handleEditSignUpPassword}
           handleEditSignUpPasswordConfirm={this.props.handleEditSignUpPasswordConfirm}
           handleStatus={this.handleSignUpStatus.bind(this)}
           user={this.props.user}
           handleSignUp={this.props.handleSignUp}
           signup={this.props.signup}
          />
    		</ul>
    );
  }

  handleLoginStatus(){
    let status = this.state.closed;
    this.setState({closed:!status, signUpStatus:false});
  }

  handleSignUpStatus(){
    let status = this.state.signUpStatus;
    this.setState({signUpStatus:!status, closed:true});
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
        ${SignUpComponent.getFragment('user')}
      }
    `,
  },
});
