import React from 'react';
import Relay from 'react-relay';
import N from '../../NoteTypes';
import NoteCreateMutation from './NoteCreateMutation';
import Status from '../User/StatusComponent';
import PickNoteForm from './PickNoteForm';

import './NoteCreator.scss';

class NoteCreator extends React.Component {

  componentWillMount() {
    this.state = {
      type: null,
      inputs: {},
      noteTypes: Object.keys(N),
      verseId: this.props.bibleVerse.id,
      status: <Status type='done' />,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: <Status type='done' />,
    });
  }

  render() {
    let form = null;
    let clearForm = null;
    let noteType = this.state.type;
    let optionsStyle = { display: 'block' };

    if (noteType !== null) {
      optionsStyle = { display: 'none' };
      clearForm = <button style={{ color: 'red' }} onClick={this.clearForm.bind(this)}>X Clear</button>;
      form = <form onSubmit={this.handleCreateNote.bind(this)} ><PickNoteForm type={this.state.type} handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs} /><input type='submit' value='save' onClick={this.handleCreateNote.bind(this)} /></form>;
    } else {
      optionsStyle = { display: 'block' };
      clearForm = null;
    }

    let setNoteType = this.setNoteType.bind(this);
    let selectedType = this.state.type;

    return (<div id='note-creator'>
            {this.state.status}
            {clearForm} {form}

          <form id='note-options' style={optionsStyle}>

            {this.state.noteTypes.map(function (type, index) {
              return <p key={index} >{type}: <input type='radio' name='form_type' onClick={setNoteType} value={type} /></p>;
            })}

          </form>
        </div>
    );
  }

  setNoteType(e) {
    this.setState({ type: e.target.value });
    this.setState({
      status: <Status type='changes-not-saved' />
    });
  }

  clearForm(e) {
    this.setState({ type: null, inputs: {} });
  }

  handleInputChanges(e) {
    e.preventDefault();
    let newInputs = this.state.inputs;
    newInputs[e.target.name] = e.target.value;
    this.setState({
      inputs: newInputs,
      status: <Status type='changes-not-saved' />
    });
  }

  handleCreateNote(e) {
    e.preventDefault();
    this.setState({ status: <Status type='saving' /> });
    let body = null;
    let inputs = this.state.inputs;
    let tags = this.state.inputs.tags;
    let type = this.state.type;

    if (type === 'STRING') {
      body = inputs.text;
    } else {
      body = JSON.stringify(inputs);
    }

    let note = {
      id: 'newNoteId',
      type,
      body,
      tags_string: tags
    };

    console.log('Saving Note...', note, this.props.bibleVerse);

    Relay.Store.commitUpdate(new NoteCreateMutation({
      newNote: note,
      bibleVerse: this.props.bibleVerse,
      note: this.props.viewer.note
    }));
  }


}

NoteCreator.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  bibleVerse: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NoteCreator, {
  initialVariables: {
  	                                                                                                    noteId: '55555',
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        user {
          id
          name
          email
        }
        
        notes(first:1, id:"newNote"){
          edges{
            node{
              ${NoteCreateMutation.getFragment('note')}
              id
              type
              body
              tags_string
            }
          }

        }
      }`,
    bibleVerse: () => Relay.QL`fragment on BibleVerse {
      id
      notesCount
      }`,
  },
});
