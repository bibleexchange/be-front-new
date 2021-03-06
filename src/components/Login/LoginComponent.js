import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import './Login.scss';

class LoginComponent extends React.Component {

  render() {

    return (

        <div id='login-form' onMouseLeave={this.props.handleStatus} >

            <form >

                <input type='text' onChange={this.props.UpdateLoginEmail} placeholder='email' ref='email' />

                <input type='password' onChange={this.props.UpdateLoginPassword} placeholder='password' ref='password' />

                <hr />

                <input type='button' value='Login' onClick={this.props.handleLogin} />
                <br />
                <a href='#'>Forgot password</a>
            </form>

        </div>
    );
  }

}

export default createFragmentContainer(LoginComponent, {
  /* TODO manually deal with:
  initialVariables: {
                                                                                                                                                                                                            slug: '',
    token: ''
  }
  */
  user: graphql`
    fragment LoginComponent_user on User {
      id
      token
      email
      name
      authenticated
    }
  `,
});
