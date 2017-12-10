/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';

class Lesson extends React.Component {

  render() {
    let lesson = this.props.lesson

    return (
              <div>
                <h2><Link to={this.props.baseUrl + '/' + lesson.cursor}>{lesson.node.title}</Link></h2>
                <p>{lesson.node.description}</p>
              </div>
    );
  }

}

class LessonsList extends React.Component {

  render() {
    let baseUrl = this.props.baseUrl;

    return (
              <div>
                {this.props.lessons.edges.map(function (lesson, key) {
                  return <div key={key} ><Lesson lesson={lesson} baseUrl={baseUrl} /></div>;
                })}
              </div>
    );
  }

}

class IndexComponent extends React.Component {

render() {
    
      if(this.props.course !== undefined){
         let course = this.props.course
         let baseUrl = '/course/' + course.id

          return (
              <div id='course-index'>
                <h1>{course.title}</h1>
                <center><img src={course.image} id='course-cover' /></center>
                <Link to={baseUrl+ '/print'} target="_blank">PRINT COURSE</Link>
                <LessonsList lessons={course.lessons} baseUrl={baseUrl} />
              </div>
          );
      }else{

          return (
              <div id='course-index'/>
          );

      }

   
  }

}

IndexComponent.propTypes = {
  course: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(IndexComponent, {
  user: () => Relay.QL`fragment on User {
        authenticated
        email
    }`,

  course: () => Relay.QL`fragment on Course {
              id
              title
              description
              image
              verse {
                id
                quote
              }
              owner {
                name
              }
              lessons(first:100){
                totalCount

                edges{
                  cursor
                  node{
                    id
                    description
                    title
                    body{
                      id
                      text
                    }
                  }
                }
              }
      }`,
});
