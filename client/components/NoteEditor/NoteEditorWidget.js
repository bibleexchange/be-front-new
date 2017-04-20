import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Loading from '../ListWidget/Loading'
import './NoteEditorWidget.scss';

import N from '../../NoteTypes';
import Template from '../../NoteTemplate';
import Status from '../User/StatusComponent';
import PickNoteForm from './PickNoteForm';

class NoteEditorWidget extends React.Component {

componentWillMount() {

  this.state = {
    inputs: {},
    noteTypes: Object.keys(N),
    status: 'original',
    myNotesStatus: false,
    data: this.setInitialData(this.props.note ),
      saveable: this.props.user.authenticated
  };
}

componentWillReceiveProps(newProps) {

    let newState = this.state
        newState.status = "done"
        newState.saveable = newProps.user.authenticated? newProps.user.authenticated:false
    if(newProps.note !== undefined && newProps.note !== null && newProps.note.id !== newState.data.id){
        newState.data = this.setInitialData(newProps.note)
    }
  this.setState(newState);
}

    render() {
    let moreNotesButton = null
      let form = null
      let clearForm = null
      let noteType = this.state.data.type
      let optionsStyle = { display: 'block' }
      let viewLink = null

      if (this.state.status !== 'done' && this.state.status !== 'original') {
        clearForm = <button style={{ color: 'red' }} onClick={this.clearForm.bind(this)}>X Undo All Changes</button>;

          if(this.state.saveable === false)  {
              form = <div style={{color: "red"}}>Your changes cannot be saved until you login!</div>
          }else{
              form = <input type='submit' value='save' onClick={this.handleUpdateNote.bind(this)} />;
          }

      }

      if(this.props.note !== null && this.props.note !== undefined ){
        viewLink = <section><Link to={"/notes/"+this.props.note.id}>View</Link></section>
      }

      if(this.props.notes.pageInfo.hasNextPage){
          moreNotesButton = <button onClick={this.props.moreNotes}>more</button>
      }

      let selectedType = this.state.type;
      let newId = this.state.data.media.length;
      let updateMedia = this.updateMedia.bind(this)
      let setNoteType = this.setNoteType.bind(this)
        let handleEditThis = this.props.handleEditThis

      return (<div id='note-creator'>
                <section>
              <button onClick={this.toggleMyNotes.bind(this)}>MyNotes</button>
              <ol id="my-notes" className={"my-notes-"+this.state.myNotesStatus}>
                  {this.props.notes.edges.map(function(note){
                      return <li onClick={handleEditThis} key={note.node.id} data-id={note.node.id}> {note.node.title} [{note.node.verse.reference}]</li>
                  })} <li>{moreNotesButton}</li>
                  </ol>



                </section>
              <section>
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
                return <li key={k}><div onChange={updateMedia} data-id={k} contentEditable={true}>{JSON.stringify(m)}</div></li>;
            })}

            <p>ADD Media...</p>
            <form id='note-options' style={optionsStyle}>

              {this.state.noteTypes.map(function (type, index) {
                return <p key={index} >{type}: <input type='radio' name='form_type' onClick={setNoteType} data-type={type} data-id={newId}/></p>;
              })}

            </form>
              </section>
          </div>
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
       let n = this.setInitialData(this.props.note );

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

    blankNote(type){
      return Template[type];
    }

    setInitialData(note){
      let n = null
      let body = {}

      if (note == undefined || note == null || note.api_request == false) {
          n = {
              id:"newNoteEdge",
              title:"",
              tags: "",
              type: "JSON",
              id: "",
              media: [],
              reference: ""
          }

      }else{

          let body = JSON.parse(note.body)

          n = {
              title: note.title,
              tags: note.tags_string,
              type: "JSON",
              id: note.id,
              reference: note.verse.reference,
              tags: note.tags_string
          }

          if (body.media !== undefined){
              n.media = body.media
          }else {
              n.media = [body]
              n.media[0].type = note.type
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

    toggleMyNotes(e){
        let s = this.state
        s.myNotesStatus = !this.state.myNotesStatus

        this.setState(s)
    }

    handleUpdateNote(e){
        this.props.handleUpdateNote(this.state.data);
    }

  }

  NoteEditorWidget.propTypes = {
      user: React.PropTypes.object.isRequired,
      note: React.PropTypes.object,
      notes: React.PropTypes.object.isRequired
  };

  export default Relay.createContainer(NoteEditorWidget, {

    fragments: {
        note: ()=> Relay.QL`fragment on Note {
                id
                title
                type
                body
                tags_string
                verse{
                  id
                  reference
                }

        }`,
        user: () => Relay.QL`fragment on User {
            id
            name
            email
            authenticated
        }`,
        notes: () => Relay.QL`fragment on SimpleNoteConnection {
                pageInfo{hasNextPage}
                edges{
                    node {
                        id
                        title
                        verse {id, reference}

                    }
                }

        }`
    }
  });
