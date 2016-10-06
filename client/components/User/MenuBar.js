import React from 'react';
import { Link } from 'react-router';
import BeLogo from '../Svg/BeLogo';

import './MenuBar.scss';

class MenuBar extends React.Component {

  render() {

    let course = this.props.course;
    let toggleMainStyle = {display:"none"};

    let toggleLessonNoteMessage = '';
//  sideBarState={this.state.sideBarState}
//  noteDrawerState=

    if(this.props.sideBarState && this.props.noteDrawerState){
      toggleLessonNoteMessage = String.fromCharCode( "9776" ) + " Lessons";
      toggleMainStyle.display = "inline-block";
    }else if(this.props.sideBarState){
      toggleLessonNoteMessage = String.fromCharCode( "9776" ) + " My Notes";
      toggleMainStyle.display = "inline-block";
    }else{
      toggleMainStyle.display = "none";
    }

    return (
    	<div id="course-editor-menu">

        <button id="editor-menu" onClick={this.props.toggleNewLesson}> &oplus; {this.props.courseInfo.lessonsCount} Lessons</button>
        <button id="editor-menu" style={toggleMainStyle} onClick={this.props.toggleNoteDrawer}>{toggleLessonNoteMessage}</button>

        <div id="main">
          <div id="course-title" style={this.props.titleStyle} >
            <input value={course.title}
            onChange={this.props.editTitle.bind(this)}
            onBlur={this.props.updateTitle.bind(this)}/>

          </div>

          <ul id="menus">
            <li>{this.props.status}</li>
          {/*
            <li>file
        		<ul>
              <li>open ... </li>
        		  <li>new Course</li>
        		  <li onClick={this.props.toggleNewLesson}>create new lesson</li>
        		</ul>
        	    </li>
              <li>edit</li>
              <li>view</li>
              <li>insert</li>
              <li>format</li>
              <li>tools</li>
              <li>help</li>
              */}
            </ul>

          </div>

        <div id="aside">

        </div>

    	</div>
    );
  }


    navigate(){
      this.context.router.push("/");
    }

}

MenuBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default MenuBar;
