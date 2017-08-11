import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import './Dashboard.scss';
import LoginComponent from '../Login/LoginComponent';
import SignUpComponent from '../Login/SignUpComponent';

import MyNotes from './MyNotes'
import Menu from './Menu'

class Dashboard extends React.Component {

  render() {

    if (this.props.user.authenticated) {
      return <div id='dashboard'>{React.cloneElement(this.props.children, { ...this.props })}</div>
    } else {

      let status = this.props.status

      return <div id='dashboard'>

      <li id="login" className={"main-"+ status.login}>
      <LoginComponent
            handleLogin={this.props.handleLogin}
            handleStatus={this.props.handleLoginStatus}
            user={this.props.user}
            UpdateLoginEmail={this.props.UpdateLoginEmail}
            UpdateLoginPassword={this.props.UpdateLoginPassword}
        />

        <input type="button" value="Register instead?" onClick={this.props.toggleLogin}/>
        </li>
            
        <li id="signup"  className={"main-"+ status.signup}>
          <SignUpComponent
                handleEditSignUpEmail={this.props.handleEditSignUpEmail}
                handleEditSignUpPassword={this.props.handleEditSignUpPassword}
                handleEditSignUpPasswordConfirm={this.props.handleEditSignUpPasswordConfirm}
                handleStatus={this.props.handleSignUpStatus}
                user={this.props.user}
                handleSignUp={this.props.handleSignUp}
                signup={this.props.signup}
            /><input type="button" value="Login instead?" onClick={this.props.toggleLogin}/>
        </li>
  </div>
    }


  }

}

Dashboard.propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

Dashboard.defaultProps = {
}

export default Relay.createContainer(Dashboard, {
  fragments: {
      user: () => Relay.QL`fragment on User {
          ${LoginComponent.getFragment('user')}
          ${SignUpComponent.getFragment('user')}
          ${Menu.getFragment('user')}
          id
          authenticated
      }`,


    myNotes: () => Relay.QL`
      fragment on NoteConnection {
        ${MyNotes.getFragment('myNotes')}
            pageInfo{hasNextPage}
            edges{
                node {
                    id
                    title
                    verse {id, reference}
                }
      }
      }`,

  },
});
