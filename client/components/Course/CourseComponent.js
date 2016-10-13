/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Lesson from './LessonComponent';
import Navigation from './Navigation';
import BibleWidget from '../Bible/WidgetComponent';
import BibleVerse from '../Bible/BibleVerse';
import NoteViewer from '../Note/NoteViewer';
import marked from 'marked';

import './Course.scss';

class Found extends React.Component {
  render() {
    return (
      	<div className="WidgetContainer">
          <div className="Widget">
      	  <Navigation course={this.props.course.course} lesson={this.props.course.course.lesson} />
      	  <Lesson lesson={this.props.course.course.lesson} />
       	</div>
      	</div>
    );
  }

  createBodyCopy(markUp){
    return {__html:markUp};
  }
}

class Missing extends React.Component {
  render() {

    return (
      <Page heading={''} >
      	<div className="WidgetContainer">
              <div className="Widget">
                <h1>Sorry Cannot Find the Requested Course!</h1>
              </div>
       	</div>
      </Page>
    );
  }

}

class Course extends React.Component {

  render() {
    let renderThis = <Missing />;

    if(this.props.course.course !== null){
      renderThis = <Found {...this.props} />
    }

    return renderThis;
  }

}

Course.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(Course, {
  initialVariables: {
    reference:"amos_1",
  	courseId: "1",
  	lessonnoteId:"1",
    lessonId:"1",
  	pageSize: 1,
  	opaqueCursor: "opaqueCursor",
  	courseSlug:"",
    token:"tokentoekntoekn",
    version:1
  },
  fragments: {
      course: ({pageSize}) => Relay.QL`fragment on Viewer {
        course(id:$courseId){
          ${Navigation.getFragment('course')}
          lesson(id:$lessonId){
            ${Navigation.getFragment('lesson')}
            ${Lesson.getFragment('lesson', {pageSize})}
        }
      }
    }`,

      viewer: () => Relay.QL`fragment on Viewer {
        bible {
      	  ${BibleWidget.getFragment('bible')}
      	}
        bibleChapter(reference:$reference){
          ${BibleWidget.getFragment('bibleChapter')}
        }
      }`,
    },
});
