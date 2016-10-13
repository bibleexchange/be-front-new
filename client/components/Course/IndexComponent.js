/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

//import './Course.scss';

class LessonComponent extends React.Component {

  render() {
    const baseUrl = this.props.baseUrl;
    return (
              <div>
                <center><h2><Link to={this.props.baseUrl+"/lesson/"+this.props.lesson.id}>LESSON: {this.props.lesson.order_by} ({this.props.lesson.notesCount} Notes)</Link></h2></center>
                <h3>{this.props.lesson.title}</h3>
                <p style={{textAlign:"center"}}>{this.props.lesson.summary}</p>
              </div>
    );
  }

}

class IndexComponent extends React.Component {

  render() {

   let baseUrl = '/course/';
   let course = {title:"Course Could not Be Loaded!"};
   let lessons = [];
   let edit = null;

   if(this.props.viewer.course !== null){
    course = this.props.viewer.course;
    baseUrl = '/course/'+course.id;
    lessons = course.lessons.edges;
   }

   if(this.props.viewer.user.authenticated == "true"){
     edit = <sup><Link to={"/user/course/"+course.id+"/edit"}> edit</Link></sup>;
   }

    return (
        <div className="WidgetContainer">
              <div className="Widget">

                <center><h1>{course.title} {edit}</h1></center>

                {lessons.map(function(lesson){
                  return <LessonComponent key={lesson.node.id} lesson={lesson.node} baseUrl={baseUrl}/>;
                })}

                <center><Link to={"/course/"+course.id+"/print"}>print this</Link></center>
              </div>
        </div>
    );
  }

}

IndexComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(IndexComponent, {
  initialVariables: {
  	courseId: "1",
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        user{
          authenticated
        }
        course(id:$courseId){
          id
          title
          lessons(first:100){
            edges{
              cursor
              node{
                id
                order_by
                summary
                notesCount
                notes(first:100){
                  edges{
                    cursor
                    node{
                      id
                      order_by
                      note{
                        output {
                          id
                          type
                          api_request
                          body
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    },
});
