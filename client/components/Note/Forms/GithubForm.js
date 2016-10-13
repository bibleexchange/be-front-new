import React from 'react';
import TextInput from '../../User/TextInput';

export default class GithubForm extends React.Component {
  render() {
    return (
        <div>
          <TextInput label="Github URL" name="raw_url" value={this.props.inputs.raw_url} handleEdit={this.props.handleInputChanges}/>
          <TextInput label="tags" name="tags" value={this.props.inputs.tags} handleEdit={this.props.handleInputChanges}/>
        </div>
    );
  }
}
