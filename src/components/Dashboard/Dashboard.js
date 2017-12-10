import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import './Dashboard.scss';
import LoginComponent from '../Login/LoginComponent';
import SignUpComponent from '../Login/SignUpComponent';

import CourseEditor from '../CourseEditor/CourseEditor'
import LessonEditor from '../LessonEditor/LessonEditor'
import MyCourses from './MyCourses'
import MyNotes from './MyNotes'
import Menu from './Menu'
import LogOut from './LogOut'

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

export default createFragmentContainer(Dashboard, {
    user: () => Relay.QL`fragment on User {
        ...LoginComponent_user
        ...SignUpComponent_user
        ...Menu_user
        ...LogOut_user
        ...CourseEditor_user
        ...LessonEditor_user
        id
        authenticated
        email
    }`,


  userCourse: graphql`
    fragment Dashboard_userCourse on UserCourse {
      ...CourseEditor_userCourse
      ...LessonEditor_userCourse
    }`,

  userLesson: graphql`
    fragment Dashboard_userLesson on UserLesson {
      ...LessonEditor_userLesson
    }`,
  userNotes: graphql`
    fragment Dashboard_userNotes on NoteConnection {
      ...MyNotes_userNotes
    }`,

  userCourses: graphql`
  fragment Dashboard_userCourses on UserCourseConnection {
    ...MyCourses_userCourses
  }`

});
