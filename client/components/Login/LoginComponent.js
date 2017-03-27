import React from 'react';
import Relay from 'react-relay';
import './Login.scss';

class LoginComponent extends React.Component {

  render() {
    let loginFormStyle = {};

    if (!this.props.status) {
      loginFormStyle.display = 'block';
    }

    return (

        <div id='login-form' style={loginFormStyle} onMouseLeave={this.props.handleStatus} >

            <form >

                <input type='text' onChange={this.props.UpdateLoginEmail} placeholder='email' ref='email' />

                <input type='password' onChange={this.props.UpdateLoginPassword} placeholder='password' ref='password' />

                <input type='checkbox' label='Remember me' />
                <hr />

                <input type='button' value='Login' onClick={this.props.handleLogin} />
                <br />
                <a href='#'>Forgot password</a>
            </form>

        </div>
    );
  }

}

export default Relay.createContainer(LoginComponent, {
  initialVariables: {
	                                                                                                                                                                                                        slug: '',
    token: ''
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
      	id
        token
      	email
      	name
      	authenticated
      }
    `,
  },
});
