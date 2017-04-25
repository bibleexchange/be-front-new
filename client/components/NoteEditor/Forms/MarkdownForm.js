import React from 'react';
import TextInput from '../TextInput';

export default class MarkdownForm extends React.Component {
  render() {
    return (
        <div>
          <TextInput label='markdown' name='text' value={this.props.inputs.text} handleEdit={this.props.handleInputChanges} />
          <TextInput label='tags' name='tags' value={this.props.inputs.tags} handleEdit={this.props.handleInputChanges} />
        </div>
    );
  }
}
