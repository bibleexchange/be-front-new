import React from 'react';
import { Link } from 'react-router';
import BeLogo from '../Svg/BeLogo';
import Relay from 'react-relay';
import NewLessonForm from './NewLessonForm';
import NotesWidget from './../Note/NotesWidget';

import './SideBar.scss';
import './NotesWidget.scss';

class LessonThumbnail extends React.Component {

  render() {
    let lesson = this.props.lesson;

    return (
    	<div>
        <p style={{float:"left"}}>{lesson.notesCount} notes</p>
        <p style={{float:"right", textAlign:"right"}}>#{lesson.order_by}</p>
        <p style={{clear:"both", width:"100%", fontWeight:"bold"}}>{lesson.title}</p>
        <p style={{clear:"both", width:"100%"}}>summary: {lesson.summary}</p>
    	</div>
    );
  }

}

function compareLessons(a,b) {
  if (a.node.order_by < b.node.order_by)
    return -1;
  if (a.node.order_by > b.node.order_by)
    return 1;
  return 0;
}

class LessonsList extends React.Component {

  componentWillReceiveProps(newProps){
    if(newProps !== this.props){
      this.props.course.lessons.edges = newProps.course.lessons.edges.sort(compareLessons);
    }
  }

  render() {

    let course = this.props.course;

    return (
      <ul>
        {course.lessons.edges.map(function(lesson){
          return <Link to={"/user/course/"+course.id+"/edit/"+lesson.node.id} key={lesson.node.id}><li><LessonThumbnail lesson={lesson.node}/></li></Link>;
        })}
        <li>
          <NewLessonForm courseId={course.id} orderBy={course.lessons.edges.length+1}/>
        </li>
      </ul>
    );
  }

}

class SideBar extends React.Component {

  render() {
    let mainStyle = {};
    let lessonsStyle = {display:"block", width:"100%"};
    let notesStyle = {display:"none", width:"100%"};

    if(!this.props.status){
      mainStyle.display = "none";
    }else if(this.props.status && this.props.notesStatus){
      lessonsStyle.display = "none";
      notesStyle.display = "block";
    }else{
      lessonsStyle.display = "block";
      notesStyle.display = "none";
    }

    return (
    	<div id="course-sidebar" style={mainStyle}>
        <div style={lessonsStyle}>
          <LessonsList course={this.props.course} style={mainStyle}/>
        </div>
        <div style={notesStyle}>
        <NotesWidget
          filter={''}
          viewer={this.props.viewer}
          selectNote={this.props.selectNote}
          tags={false}/>
      </div>
    	</div>
    );
  }


    navigate(){
      this.context.router.push("/");
    }

}

SideBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Relay.createContainer(SideBar, {
  initialVariables: {
	courseId: 1
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      ${NotesWidget.getFragment('viewer')}
    }`,

    course: () => Relay.QL`fragment on Course {
        id
        title
        lessonsCount
        lessons (first:100){
          pageInfo
          edges{
            cursor
            node{
              id
              title
              summary
              notesCount
              order_by
            }
          }
        }
  }`,

 },
});
