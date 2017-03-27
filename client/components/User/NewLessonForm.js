/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import LessonCreateMutation from './LessonCreateMutation';
import Status from './StatusComponent';
import TextInput from './TextInput';
import HiddenInput from './HiddenInput';

class NewLessonForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lesson: {
        id: 'newlesson',
        title: '',
        order_by: this.props.orderBy,
        summary: '',
        course_id: this.props.courseId
      },
      status: <Status type='changes-not-saved' />
    };
  }

  render() {
    return (
        <div id='lesson'>
          <div id='main'>
            <TextInput label='order by: ' name='order_by' value={this.state.lesson.order_by} handleEdit={this.handleEdit.bind(this)} />
            <TextInput label='title: ' name='title' value={this.state.lesson.title} handleEdit={this.handleEdit.bind(this)} />
            <TextInput label='summary: ' name='summary' value={this.state.lesson.summary} handleEdit={this.handleEdit.bind(this)} />
            <HiddenInput name='course_id' value={this.state.lesson.course_id} />
            <input type='submit' id='save' value='create new lesson' onClick={this.handleUpdate.bind(this)} /> {this.state.status}
          </div>
        </div>
    );
  }

  handleEdit(e) {
    let p = e.target.name;

    let l = this.state.lesson;
    l[p] = e.target.value;

    this.setState({
    	                                                                                                    lesson: l,
    	                                                                                                    status: <Status type='changes-not-saved' />
    	});
  }

  handleUpdate(e) {
    console.log('Saving...', this.state.lesson);
    this.setState({ status: <Status type='saving' /> });

    Relay.Store.commitUpdate(new LessonCreateMutation({
      lesson: this.state.lesson
    }));
  }

}

NewLessonForm.propTypes = {};

export default NewLessonForm;
