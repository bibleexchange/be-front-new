import React from 'react';
import Relay from 'react-relay';
import './Login.scss';

class SignUpComponent extends React.Component {

  render() {

    let loginFormStyle = {};

    if(!this.props.status){
      loginFormStyle.display = "block";
    }

    return (

        <div id="login-form" style={loginFormStyle} onMouseLeave={this.props.handleStatus} >

            <form >

                <input type="text" onChange={this.props.editSignUp} placeholder='email' ref="email" />

                <input type="password" onChange={this.props.editSignUp} placeholder='password' ref="password" />

                <input type="password" onChange={this.props.editSignUp} placeholder='password confirmation' ref="password_confirmation" />
                <hr />

                <input type="button" value="Sign Up" onClick={this.props.handleSignUp}/>
                <br />
                <a href='#'>Forgot password</a>
            </form>

        </div>
    );
  }

}

export default Relay.createContainer(SignUpComponent, {
  initialVariables: {
	slug:'',
  token:''
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
