import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Loading from '../ListWidget/Loading'
import './NoteEditorWidget.scss';

import N from '../../NoteTypes';
import Template from '../../NoteTemplate';
import NoteUpdateMutation from './NoteUpdateMutation';
import Status from '../User/StatusComponent';
import PickNoteForm from './PickNoteForm';

class NoteEditorWidget extends React.Component {

componentWillMount() {

  this.state = {
    inputs: {},
    noteTypes: Object.keys(N),
    status: 'original',
    data: this.setInitialData(this.props.viewer.note )
  };
}

componentWillReceiveProps(newProps) {
  this.setState({
    status: "done",
  });
}

    render() {

      let form = null
      let clearForm = null
      let noteType = this.state.data.type
      let optionsStyle = { display: 'block' }
      let viewLink = null

      if (this.state.status !== 'done' && this.state.status !== 'original') {
        clearForm = <button style={{ color: 'red' }} onClick={this.clearForm.bind(this)}>X Undo All Changes</button>;
        form = <input type='submit' value='save' onClick={this.handleUpdateNote.bind(this)} />;
      }

      if(this.props.viewer.note !== undefined){
        viewLink = <section><Link to={"/notes/"+this.props.viewer.note.id}>View</Link></section>
      }

      let selectedType = this.state.type;
      let newId = this.state.data.media.length;
      let updateMedia = this.updateMedia.bind(this)
      let setNoteType = this.setNoteType.bind(this)

      return (<ul id='note-creator'>

              <div id="status-bar">
                <section>{clearForm}</section>
                <section>{form}</section>
                <section> <Status type={this.state.status} /></section>
                  {viewLink}
              </div>

              <h1>Title: <input type="text" value={this.state.data.title? this.state.data.title:""} onChange={this.updateTitle.bind(this)}/></h1>

              <h2>Bible Reference: <input type="text" value={this.state.data.reference? this.state.data.reference:""} onChange={this.updateReference.bind(this)}/></h2>

              <h2>Tags: <input type="text" value={this.state.data.tags? this.state.data.tags:""} onChange={this.updateTags.bind(this)}/></h2>

            {this.state.data.media.map(function(m,k){
              return <li key={k}><input type="text" value={JSON.stringify(m)} onChange={updateMedia} data-id={k}/></li>;
            })}

            <p>ADD Media...</p>
            <form id='note-options' style={optionsStyle}>

              {this.state.noteTypes.map(function (type, index) {
                return <p key={index} >{type}: <input type='radio' name='form_type' onClick={setNoteType} data-type={type} data-id={newId}/></p>;
              })}

            </form>
          </ul>
      );
    }

    setNoteType(e) {

    let id = +e.target.dataset.id
    let type = e.target.dataset.type

      let newMedia = {id: id, type: type, body: this.blankNote(type)};
      let data = this.state.data
      data.media[id] = newMedia

      this.setState({
        status: 'changes-not-saved',
        data: data
      });
    }

    clearForm(e) {
       let n = this.setInitialData(this.props.viewer.note );

       this.setState({data: n, status: "original"})
    }

    handleInputChanges(e) {
      e.preventDefault();
      let newInputs = this.state.inputs;
      newInputs[e.target.name] = e.target.value;
      this.setState({
        inputs: newInputs,
        status: 'changes-not-saved'
      });
    }

    updateTitle(e){
      e.preventDefault()
      let data = this.state.data
      data.title = e.target.value

      this.setState({
        data: data,
        status: 'changes-not-saved',
      })
    }


      updateReference(e){
        e.preventDefault()
        let data = this.state.data
        data.reference = e.target.value

        this.setState({
          data: data,
          status: 'changes-not-saved',
        })
      }

      updateTags(e){
        e.preventDefault()
        let data = this.state.data
        data.tags = e.target.value

        this.setState({
          data: data,
          status: 'changes-not-saved',
        })
      }

    handleUpdateNote(e) {
      e.preventDefault();
      this.setState({ status:'saving'});

      Relay.Store.commitUpdate(new NoteUpdateMutation({
        changedNote: this.state.data,
        note: this.props.viewer.note
      }));
    }

    blankNote(type) {
      return Template[type];
    }

    setInitialData(note){
      let n = null
      let body = {}

      if (note !== undefined) {
          let body = JSON.parse(note.body)

          n = {
              title: note.title,
              tags: note.tags_string,
              type: note.type,
              id: note.id,
              reference: note.verse.reference,
              tags: note.tags_string
          }

          if (body.media !== undefined){
            n.media = body.media
          }else {
            n.media = body
          }

      }else{
        n = {
          title:"",
          tags: "",
          type: "",
          id: "",
          media: [],
          reference: ""
        }
      }

      return n;

    }

    updateMedia(e){
      e.preventDefault()
      let data = this.state.data

      data.media[e.target.dataset.id] = JSON.parse(e.target.value)

    this.setState({
        data: data,
        status: <Status type='changes-not-saved' />,
      })
    }

  }

  NoteEditorWidget.propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  export default Relay.createContainer(NoteEditorWidget, {
    initialVariables: {
    	noteId: 'Tm90ZToyMzUxNQ=',
    },
    fragments: {
        viewer: ({noteId}) => Relay.QL`fragment on Viewer {
          user {
            id
            name
            email
          }

          note(id:$noteId){
                ${NoteUpdateMutation.getFragment('note')}
                id
                title
                type
                body
                tags_string
                verse{
                  id
                  reference
                }
            }

        }`
    }
  });
