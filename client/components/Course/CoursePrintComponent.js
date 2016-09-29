/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import LessonComponent from './LessonListComponent';

class CoursePrintComponent extends React.Component {

  render() {

   let baseUrl = '/course/';
   let course = {title:"Course Could not Be Loaded!"};
   let lessons = [];

   if(this.props.viewer.course !== null){
	course = this.props.viewer.course;
	baseUrl = '/course/'+course.id;
	lessons = course.lessons.edges;
   }

    return (

        <div>
                <h1><center>{course.title}</center></h1>

                <h2>Table of Contents</h2>

                <ul>
                {lessons.map(function(lesson){
                  return <li key={lesson.node.id} ><Link to={"#lesson_"+lesson.node.order_by}>{lesson.node.title}</Link><p>{lesson.node.summary}</p></li>;
                })}
                </ul>

                <ul>
                {lessons.map(function(lesson){
                  return <li id={"lesson_"+lesson.node.order_by} key={lesson.node.id} ><LessonComponent lesson={lesson.node} baseUrl={baseUrl}/></li>;
                })}
                </ul>
        </div>
    );
  }

}

CoursePrintComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(CoursePrintComponent, {
  initialVariables: {
  	courseId: "1",
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        course(id:$courseId){
          id
          title
          lessons(first:100){
            edges{
              cursor
              node{
                id
                title
                summary
                ${LessonComponent.getFragment('lesson')}
                }
              }
            }
          }
      }`,
    },
});
