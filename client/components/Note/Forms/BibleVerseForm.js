import React from 'react';
import TextInput from '../../User/TextInput';

export default class BibleVerseForm extends React.Component {
  render() {
    return (
        <div>
          <TextInput label='cross reference' name='reference' value={this.props.inputs.reference} handleEdit={this.props.handleInputChanges} />
          <TextInput label='tags' name='tags' value={this.props.inputs.tags} handleEdit={this.props.handleInputChanges} />
        </div>
    );
  }
}
