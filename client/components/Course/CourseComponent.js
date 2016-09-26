/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import Navigation from './Navigation';
import BibleWidget from '../Bible/WidgetComponent';
import BibleVerse from '../Bible/BibleVerse';
import NoteViewer from '../Note/NoteViewer';
import marked from 'marked';

import './Course.scss';

class Lesson extends React.Component {
  render() {

    let nextButton = null;

    if(this.props.lesson.notes.edges.length < this.props.lesson.notesCount){
      nextButton = <button onClick={this.props.handleNoteLoad}>Get {this.props.lesson.notes.edges.length + 1} of { this.props.lesson.notesCount}</button>;
    }else{
      nextButton = null;
    }

      return (
        <div style={{padding:"15px"}}>
          {this.props.lesson.notes.edges.map(function(note){
            return <NoteViewer key={note.node.id} note={note.node} />;
          })}

          {nextButton}

        </div>
    );
  }
}

class Found extends React.Component {
  render() {

	  let next = false;
    let previous = false;
    let course = this.props.course.course;

    if(course.lesson.next !== null){
      	next = { pathname:'/course/'+course.id+'/lesson/'+course.lesson.next.id};
    }
    if(course.lesson.previous !== null){
        previous = { pathname:'/course/'+course.id+'/lesson /'+course.lesson.previous.id};
    }

  let bibleWidget = null;
/*
  if(this.props.viewer.bibleChapter !== undefined){
    next = { pathname:nexturl, query: { ref: this.props.viewer.bibleChapter.nextChapter.referenceSlug } };
    previous = { pathname:previousurl, query: { ref: this.props.viewer.bibleChapter.previousChapter.referenceSlug } };
    bibleWidget =   <BibleWidget bible={this.props.viewer.bible} bibleChapter={this.props.viewer.bibleChapter} bibleVerse={null} baseUrl={"/course/"+this.props.viewer.course.id+"/step/"+this.props.viewer.lessonnote.id}/>;
  }
*/
    return (
      <Page heading={''} >
      	<div className="WidgetContainer">
              <div className="Widget">
      	  <Navigation course={this.props.course.course} lesson={this.props.course.course.lesson} nextStepUrl={next} previousStepUrl={previous}/>
      	  <Lesson lesson={this.props.course.course.lesson} handleNoteLoad={this.props.handleNoteLoad} />
       	</div>
        {/*}
      	<div className="Widget">
      	  {bibleWidget}
      	</div>
        */}
      	</div>
      </Page>
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
      	<div className="Widget">

      	</div>
      </Page>
    );
  }

  createBodyCopy(markUp){
    return {__html:markUp};
  }
}

class Course extends React.Component {

  render() {
    let renderThis = <Missing />;

    if(this.props.viewer.course !== null){
      renderThis = <Found {...this.props} handleNoteLoad={this.handleNoteLoad.bind(this)}/>
    }

    return renderThis;
  }

  handleNoteLoad() {
  // Increments the number of stories being rendered by 10.
  this.props.relay.setVariables({
    pageSize: this.props.relay.variables.pageSize + 1
  });
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
      course: () => Relay.QL`fragment on Viewer {
        course(id:$courseId){
          ${Navigation.getFragment('course')}
          id
          title
          lessons(first:100){
            edges{
              cursor
              node{
                id
                order_by
              }
            }
          }
          lesson(id:$lessonId){
            ${Navigation.getFragment('lesson')}
            id
            order_by
            title
            summary
            notesCount
            next{id, title}
            previous{id, title}
            notes(first:$pageSize){
              edges {
                cursor
                node {
                  id
                  next {
                    id
                  }
                  note {
                    output {
                      id
                      type
                      api_request
                      body
                    }
                  }
                  previous {
                    id
                  }
                }
              }
            }
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
