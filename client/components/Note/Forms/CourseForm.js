import React from 'react';
import TextInput from '../../User/TextInput';

export default class CourseForm extends React.Component {
  render() {
    return (
        <div>
          <TextInput label='course id' name='course_id' value={this.props.inputs.course_id} handleEdit={this.props.handleInputChanges} />
          <TextInput label='tags' name='tags' value={this.props.inputs.tags} handleEdit={this.props.handleInputChanges} />
        </div>
    );
  }
}
