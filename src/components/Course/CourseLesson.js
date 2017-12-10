/* eslint-disable global-require */
import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import Lesson from './LessonComponent';
import Navigation from './Navigation';

import './CourseLesson.scss';

class Found extends React.Component {

  render() {

    let sectionId = this.props.params.section ? this.props.params.section : 1;
    let stepId = this.props.params.step ? this.props.params.step : 1;
    let currentLesson = null;
    let nextLesson = null;
    let baseUrl = '/course/' + this.props.course.id;
    let language = this.props.language
    let handleLanguage = this.props.handleLanguage

//<Navigation course={course} section={sectionId} step={stepId} baseUrl={baseUrl} nextAndPrevious={nextAndPrevious} />

    return (
      	<div>    
          <Lesson baseUrl={baseUrl} lessons={this.props.course.lessons} language={language} handleLanguage={handleLanguage} />
      	</div>
    );
  }
    
}

class Missing extends React.Component {
  render() {
    return (
      	<div className='WidgetContainer'>
              <div className='Widget'>
                <h1>Sorry Cannot Find the Requested Course!</h1>
              </div>
       	</div>
    );
  }

}

class Course extends React.Component {

  componentWillMount(){
    console.log(this.props)
  }

  componentWillReceiveProps(newProps){
    console.log(newProps)
  }
  render() {
    let renderThis = <Missing />;

    if (this.props.course !== null && this.props.course !== undefined ) {
      renderThis = <Found {...this.props} />;
    }

    return (renderThis);
  }

}

Course.propTypes = {
  user: React.PropTypes.object.isRequired,
  course: React.PropTypes.object,  
};

export default createFragmentContainer(Course, {
  /* TODO manually deal with:
  initialVariables: {
    lessonId: undefined,
    lessonCursor: undefined
  }
  */
  user: () => Relay.QL`fragment on User {
        authenticated

    }`,
    course: () => Relay.QL`fragment on Course {
                id
                lessons(first:2, after:$lessonCursor){
                  ...Lesson_lessons
                  edges{
                    cursor
                    node{
                      
                      id
                      title
                      description
                      body{
                        id
                        text
                      }
                     
                     quizzes(first:1) {
                        edges {
                          node {
                            id
                            title
                            questions
                            solution
                          }
                        }
                      }

                    }
                  }
                  
                }

        }`,
});

