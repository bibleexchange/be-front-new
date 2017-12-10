/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import LessonBody from './LessonBody';
//import QuizComponent from './QuizComponent'
import Quizzer from '../Quizzer/Index';

import marked from 'marked';
import './Lesson.scss';

class LessonComponent extends React.Component {

  componentWillReceiveProps(newProps){
    //console.log(newProps, "lesson received new props")
  }

  render() {

    let handleLanguage = this.props.handleLanguage
    let language = this.props.language
    let quiz= {}
    let nextLessonUrl = null
    let Qzr = null

    let currentLesson = this.props.lessons.edges[0]
    let nextLesson = this.props.lessons.edges[1]

    if(currentLesson.quizzes !== undefined){
      quiz = currentLesson.quizzes.edges[0].node
      nextLessonUrl = this.props.baseUrl + "/" + nextLesson.cursor 
    }

    if(quiz.questions !== undefined){
      Qzr = <Quizzer quiz={quiz} nextLessonUrl={nextLessonUrl}/>
    }else{
      Qzr = null
    }

    return (
        <div id="lesson-bodies">
          <LessonBody body={currentLesson.node.body} language={language} handleLanguage={handleLanguage}/>
          {Qzr}
        </div>
    );
  }

}

LessonComponent.propTypes = {
  lessons: React.PropTypes.object.isRequired,
};

export default createFragmentContainer(LessonComponent, {
    lessons: () => Relay.QL`fragment on LessonConnection {
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
        }`,
});
