/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
//import StepCreateMutation from './StepCreateMutation';
import Status from './StatusComponent';
import NotePreview from '../Note/NotePreview';
import TextInput from './TextInput';
import HiddenInput from './HiddenInput';

class NewLessonNoteForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      note: {
        id: 'newlessonoteid0',
        lesson_id: this.props.lesson.id,
        note_id: this.props.note.id,
        order_by: this.props.orderBy
      },
      status: <Status type='changes-not-saved' />
    };
  }

  render() {
    return (
        <div className='new-note'>
          <button id='delete' onClick={this.props.clearNote}>&#10008;</button>
          <h2>Add this Note?</h2>


          {this.state.status}
          <HiddenInput name='lesson_id' value={this.state.note.lesson_id} />
          <HiddenInput name='note_id' value={this.state.note.note_id} />
          <TextInput label='order by:' name='order_by' value={this.state.note.order_by} handleEdit={this.handleEdit.bind(this)} />
          <input type='submit' value={"create new lesson note"} onClick={this.handleUpdate.bind(this)} />


          <NotePreview note={this.props.note} />

        </div>
    );
  }

  handleEdit(e) {
    let p = e.target.name;
    let n = this.state.note;
    n[p] = e.target.value;

    this.setState({
    	                                                                                                    note: n,
    	                                                                                                    status: <Status type='changes-not-saved' />
    	});
  }

  handleUpdate(e) {
    console.log('Saving LessonNote...', this.state.note);
    this.setState({ status: <Status type='saving' /> });

    Relay.Store.commitUpdate(new StepCreateMutation({
      step: this.state.note
    }));
  }
}

NewLessonNoteForm.propTypes = {
  note: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NewLessonNoteForm, {
  initialVariables: {
    pageSize: 100,
    opaqueCursor: 'opaqueCursor',
  },
  fragments: {
    note: () => Relay.QL`fragment on Note {
        ${NotePreview.getFragment('note')}
        id
        type
        output{
          type
          body
        }
    }`,
  },
});
