/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import NoteViewer from '../Note/NoteViewer';
import LessonBody from './LessonBody';
import QuizComponent from './QuizComponent';
import marked from 'marked';
import './Lesson.scss';


class LessonComponent extends React.Component {
  render() {

    let handleLanguage = this.props.handleLanguage
    let language = this.props.language
    
    return (
        <div id="lesson-bodies">
          {this.props.lesson.media.map(function (m, key) {
            return <LessonBody key={key} media={m} language={language} handleLanguage={handleLanguage}/>;
          })}
        </div>
    );
  }

}

LessonComponent.propTypes = {
  lesson: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(LessonComponent, {
  fragments: {}
});
