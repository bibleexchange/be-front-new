/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import LessonNoteEditor from './LessonNoteEditor';
import NewLessonNoteForm from './NewLessonNoteForm';
import LessonUpdateMutation from './LessonUpdateMutation';
import Status from './StatusComponent';
import TextInput from './TextInput';

import './LessonEditor.scss';

class LessonEditor extends React.Component {

  constructor(props) {
    super(props);

    let lesson = this.props.viewer.course.lesson;

    this.state = {
     lesson: {
       id: lesson.id,
       title: lesson.title,
       course_id: lesson.course_id,
       order_by: lesson.order_by,
       summary: lesson.summary,
     },
     status: <Status type="done"/>
   };
}

  componentWillReceiveProps(newProps){

    let lesson = newProps.viewer.course.lesson;

    if(lesson.id !== this.props.viewer.course.lesson.id){

      this.setState({
        lesson: {
          id: lesson.id,
          title: lesson.title,
          course_id: lesson.course_id,
          order_by: lesson.order_by,
          summary: lesson.summary,
        }
      });

    }

    this.setState({
      status: <Status type="done"/>,
    });

  }

  render() {

    let newNote = null;
    let lesson = this.props.viewer.course.lesson;
    let note = this.props.note;

    if(note !== null && note.id !== undefined){
      newNote = <NewLessonNoteForm lessonnote={{}} note={note} lesson={lesson} orderBy={lesson.notesCount+1} />;
    }

      return (
        <div id="lesson">
          <button id="close" onClick={this.goBackToCourse.bind(this)}>&times;</button>
          <div id="main">
            <TextInput id="lesson-orderby" label="order by: " name="order_by" value={this.state.lesson.order_by} handleEdit={this.handleEdit.bind(this)}/>
            <TextInput id="lesson-title" label="title: " name="title" value={this.state.lesson.title} handleEdit={this.handleEdit.bind(this)}/>
            <TextInput id="course-id" label="course: " name="course_id" value={this.state.lesson.course_id} handleEdit={this.handleEdit.bind(this)}/>
            <TextInput id="lesson-summary" label="summary: " name="summary" value={this.state.lesson.summary} handleEdit={this.handleEdit.bind(this)}/>

            <div id="notes-count">
              {lesson.notesCount} notes |
              <input type="submit" id="save" value="save" onClick={this.handleUpdate.bind(this)} /> {this.state.status}
            </div>

          </div>

          <div id="notes">
            {lesson.notes.edges.map(function(bridge){
              return <LessonNoteEditor key={bridge.node.id} lessonnote={bridge.node} />;
            })}
          </div>

          <div id="bottom-menu">
          {newNote}
          </div>

        </div>
    );
  }

  handleEdit(e){

    let p = e.target.name;

    let l = this.state.lesson;
    l[p] = e.target.value;

    this.setState({
    	lesson:l,
    	status: <Status type="changes-not-saved"/>
    	});
  }

  handleUpdate(e){
    console.log('Saving...', this.state.lesson);
    this.setState({status: <Status type="saving"/>});

    Relay.Store.commitUpdate(new LessonUpdateMutation({
      lessonChanged: this.state.lesson,
      lesson: this.props.viewer.course.lesson
    	}));
  }

  goBackToCourse(){
    this.context.router.push("/user/course/"+this.props.viewer.course.id+"/edit");
  }

}

LessonEditor.contextTypes = {
   router: React.PropTypes.object.isRequired
 };

LessonEditor.defaultProps = {
	course:{}
};

LessonEditor.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};
//
export default Relay.createContainer(LessonEditor, {
  initialVariables: {
    noteId:"",
    lessonId:"",
    courseId:"",
    pageSize:100
  },
  prepareVariables: prevVariables => {

    return {
      ...prevVariables
    };
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      course(id: $courseId) {
        id
        lesson (id: $lessonId){
          ${LessonUpdateMutation.getFragment('lesson')}
          id
          course_id
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
                ${LessonNoteEditor.getFragment('lessonnote')}
                id
              }
            }
          }
        }
      }

    note(id:$noteId){
        ${NewLessonNoteForm.getFragment('note')}
        id
      }
  }`
 },
});
