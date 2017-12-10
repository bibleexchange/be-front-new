import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import './Login.scss';

class SignUpComponent extends React.Component {

  render() {
    let messageStyle = { color: 'red', height: '20px' };
    if (this.props.signup.message === 'passwords match :)') { messageStyle.color = 'green'; }

    return (
        <div id='login-form' onMouseLeave={this.props.handleStatus} >
            <form >
                <input value={this.props.signup.email} type='text' onChange={this.props.handleEditSignUpEmail} placeholder='email' ref='email' />
                <input value={this.props.signup.password} type='password' onChange={this.props.handleEditSignUpPassword} placeholder='password' ref='password' />
                <input id='message' style={messageStyle} value={this.props.signup.message} type='text' disabled='disabled' />
                <input value={this.props.signup.password_confirmation} type='password' onChange={this.props.handleEditSignUpPasswordConfirm} placeholder='password confirmation' ref='password_confirmation' />
                <hr />
                <input type='button' value='Sign Up' onClick={this.props.handleSignUp} />
            </form>
        </div>
    );
  }

}

export default createFragmentContainer(SignUpComponent, {
  user: graphql`
    fragment SignUpComponent_user on User {
      id
      token
      email
      name
      authenticated
    }
  `,
});
