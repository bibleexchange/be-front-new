import React from 'react';
import LoginUserMutation from '../../mutations/LoginUserMutation';
import Relay from 'react-relay';

class LoginComponent extends React.Component {

  componentWillMount(){
    this.state = {
      email : null,
      password:null,
      token:null
    };
  }

  render() {

    let loginFormStyle = {
      position:"absolute",
      display:"none",
      width: '100%',
      backgroundColor:"rgba(0, 0, 0, 0.5)",
      left:"0"
    };

    let inputStyle = {
      display:"block",
      padding:"20px",
      width:"100%",
      margin:"auto"
    };

    if(!this.props.status){
      loginFormStyle.display = "block";
    }

    return (

        <div style={loginFormStyle} onMouseLeave={this.props.handleStatus} >

            <form id="login-form" style={{ margin: 'auto', width:"70%" , padding:"50px"}} >

                <input type="text" onChange={(e) => {this.setState({email:e.target.value})}} placeholder='email' style={inputStyle} ref="email" />

                <input type="password" onChange={(e) => {this.setState({password:e.target.value})}} placeholder='password' style={inputStyle} ref="password" />

                <input type="checkbox" label='Remember me' style={inputStyle} />
                <hr />

                <input type="button" value="Login" style={inputStyle} onClick={this.handleSubmit.bind(this)}/>
                <br />
                <a href='#'>Forgot password</a>
            </form>

        </div>
    );
  }

  handleSubmit(e){
    //e.preventDefault();

    var onSuccess = (Login) => {
      console.log('Mutation successful!', Login ,' Stored token: ', Login.loginUser.user.token);
	    localStorage.setItem("be_token", Login.loginUser.user.token);
      this.setState({token:Login.loginUser.user.token});
      window.location.href = '/log-me-in';
    };

    var onFailure = (transaction) => {
      var error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

   let details = {
	email: this.refs.email.value,
	password: this.refs.password.value
   };

    Relay.Store.commitUpdate(
       new LoginUserMutation({input: details, user: this.props.user}), {onFailure, onSuccess}
     );

  }

}

export default Relay.createContainer(LoginComponent, {
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
        ${LoginUserMutation.getFragment('user')}
      }
    `,
  },
});
