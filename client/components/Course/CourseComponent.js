/* eslint-disable global-require */
import React from 'react'
import Relay from 'react-relay'
import Lesson from './LessonComponent'
import Navigation from './Navigation'
import marked from 'marked'

import './Course.scss'

class Found extends React.Component {
  render() {
    let viewer = this.props.viewer
    let courses = []

    if(this.props.viewer.courses !== undefined){courses = this.props.viewer.courses.edges}

    return (
      	<div className="WidgetContainer">
          {courses.map(function(course){
            return <div className="Widget" key={course.node.id}><Navigation course={course.node} lesson={course.node.lessons.edges[0].node} /><Lesson lesson={course.node.lessons.edges[0].node} viewer={viewer}/></div>
          })}
      	</div>
    )
  }
}

class Missing extends React.Component {
  render() {

    return (
      	<div className="WidgetContainer">
              <div className="Widget">
                <h1>Sorry Cannot Find the Requested Course!</h1>
              </div>
       	</div>
    )
  }

}

class Course extends React.Component {

  render() {
    let renderThis = <Missing />

    if(this.props.viewer.courses !== null){
      renderThis = <Found {...this.props} />
    }

    return (renderThis)
  }

}

Course.propTypes = {
  viewer: React.PropTypes.object.isRequired,
}

export default Relay.createContainer(Course, {
  initialVariables: {
    reference:"amos_1",
  	courseId: "1",
    lessonId:"1",
  	pageSize: 1,
  	opaqueCursor: "opaqueCursor",
  	courseSlug:"",
    token:"tokentoekntoekn",
    version:1,
    bibleVersion:'kjv',
    biblePageSize:1,
    lessonsPageSize: 1
  },
  fragments: {
      viewer: ({pageSize}) => Relay.QL`fragment on Viewer {
        user {
          authenticated
        }
        ${Lesson.getFragment('viewer')}
        courses(id:$courseId, first:1){
          edges{
            node{
              id
              ${Navigation.getFragment('course')}
              lessons(first:$lessonsPageSize, id:$lessonId){
                edges{
                  cursor
                  node{
                    ${Navigation.getFragment('lesson')}
                    ${Lesson.getFragment('lesson', {pageSize})}
                  }
                }
              }
            }
          }
      }

      }`,
    },
})
