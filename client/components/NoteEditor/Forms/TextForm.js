import React from 'react';
import TextInput from '../../User/TextInput';

export default class TextForm extends React.Component {
  render() {
    return (
        <div>
          <TextInput label='text' name='text' value={this.props.inputs.text} handleEdit={this.props.handleInputChanges} />
          <TextInput label='tags' name='tags' value={this.props.inputs.tags} handleEdit={this.props.handleInputChanges} />
        </div>
    );
  }
}
