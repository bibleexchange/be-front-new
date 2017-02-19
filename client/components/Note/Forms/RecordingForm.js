import React from 'react';
import TextInput from '../../User/TextInput';

export default class RecordingForm extends React.Component {
  render() {

    return (
        <div>
          <TextInput label="title" name="title" value={this.props.inputs.title} handleEdit={this.props.handleInputChanges}/>
          <TextInput label="text" name="text" value={this.props.inputs.text} handleEdit={this.props.handleInputChanges}/>
          <TextInput label="people" name="people" value={this.props.inputs.people} handleEdit={this.props.handleInputChanges}/>
          <TextInput label="tags" name="tags" value={this.props.inputs.tags} handleEdit={this.props.handleInputChanges}/>

          links: <textarea name="links" value={this.props.inputs.links} onChange={this.props.handleInputChanges}></textarea>

        </div>
    );
  }
}
