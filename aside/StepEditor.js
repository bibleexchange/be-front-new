/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import StepUpdateMutation from './StepUpdateMutation';
import StepDestroyMutation from './StepDestroyMutation';
import Status from './StatusComponent';
import NotePreview from '../Note/NotePreview';
import TextInput from './TextInput';

import './StepEditor.scss';

class StepEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: {
        id: this.props.step.id,
        lesson_id: this.props.step.lesson_id,
        note_id: this.props.step.note_id,
        order_by: this.props.step.order_by
      },
      status: <Status type='done' />,
      preview: false
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: <Status type='done' />,
    });
  }

  render() {
    let previewStyle = { display: 'none' };

    if (this.state.preview) {
      previewStyle.display = 'block';
    }

    let preview = 'Something wrong with connecting with this note.';

    if (this.props.step.note !== undefined) {
      preview = (<div><button onClick={this.togglePreview.bind(this)} >preview {this.props.step.note.type}</button>
        <div id='preview' style={previewStyle}>
          <NotePreview note={this.props.step.note} />
        </div></div>);
    } else {
      preview = 'Something wrong with connecting with this note.';
    }

    return (
        <div className='note'>
          <button id='delete' onClick={this.handleDestroy.bind(this)}>&#10008;</button>
          {this.state.status}

          <TextInput label='lesson' name='lesson_id' value={this.state.step.lesson_id} handleEdit={this.handleEdit.bind(this)} />
          <TextInput label='note' name='note_id' value={this.state.step.note_id} handleEdit={this.handleEdit.bind(this)} />
          <TextInput label='order' name='order_by' value={this.state.step.order_by} handleEdit={this.handleEdit.bind(this)} />

          <input type='submit' value={"save"} onClick={this.handleUpdate.bind(this)} />
          {preview}
        </div>
    );
  }

  handleEdit(e) {
    let p = e.target.name;

    let n = this.state.note;
    n[p] = e.target.value;

    this.setState({
    	                                                                                                    step: n,
    	                                                                                                    status: <Status type='changes-not-saved' />
    	});
  }

  handleUpdate(e) {
    console.log('Saving...', this.state.step);
    this.setState({ status: <Status type='saving' /> });

    Relay.Store.commitUpdate(new StepUpdateMutation({
      noteChanged: this.state.step,
      step: this.props.step
    }));
  }

  handleDestroy(e) {
    console.log('Destroying Step...');
    this.setState({ status: <Status type='saving' /> });

    Relay.Store.commitUpdate(new StepDestroyMutation({
      step: this.props.step
    }));
  }

  togglePreview() {
    this.setState({ preview: !this.state.preview });
  }

}

StepEditor.propTypes = {
  step: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(StepEditor, {
  initialVariables: {
    null
  },
  fragments: {
    step: () => Relay.QL`fragment on Step {
	      ${StepUpdateMutation.getFragment('step')}
        ${StepDestroyMutation.getFragment('step')}
        id
      	lesson_id
      	note_id
      	order_by
        next {id}
        previous {id}
      	note{
          ${NotePreview.getFragment('note')}
          id
          type
          body
          tags
          output {
            id
            type
            api_request
            body
          }
      	}
      }`,
  },
});
