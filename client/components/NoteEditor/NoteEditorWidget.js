import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Loading from '../ListWidget/Loading'
import './NoteEditorWidget.scss';
import NotesWidget from '../Note/NotesWidget';

import N from '../../NoteTypes';
import Template from '../../NoteTemplate';
import Status from './StatusComponent';
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

      let selectedType = this.state.type;
      let handleEditThis = this.props.handleEditThis

      return (<div id='note-creator'>
                <section>
              <button onClick={this.toggleMyNotes.bind(this)}>MyNotes</button>
              <ol id="my-notes" className={"my-notes-"+this.state.myNotesStatus}>
                  <li onClick={this.createBlankNote.bind(this)} data-id={undefined}> <em>create new note</em></li>
                  <li>
                  <NotesWidget
                    status={this.props.myNotesWidget}
                    notes={this.props.notes}
                    selectNote={handleEditThis}
                    tags
                    handleUpdateNoteFilter={this.props.handleUpdateMyNoteFilter}
                    handleNextNotePage={this.props.moreNotes}
                    handleNotesAreReady={this.props.handleNotesAreReady}
                    handleEditThis={handleEditThis}
                    user={this.props.user}
                  />
                  </li>
                  </ol>
                   </section>
              <section>
               
                <div id="note">
                  <main>
                    <textarea onChange={this.updateBody.bind(this)} value={this.removeMeta(this.state.data.body)} >{this.state.data.body}</textarea>
                  </main>

                  <aside>

                   <div id="status-bar">
                    <section>{clearForm}</section>
                    <section>{form}</section>
                    <section> <Status type={this.state.status} /></section>
                      {viewLink}
                  </div>

                  <h1>Title: <input type="text" value={this.state.data.title} onChange={this.updateTitle.bind(this)}/> noted on Scripture: <input type="text" value={this.state.data.reference} onChange={this.updateReference.bind(this)}/></h1>

                  <h2>TAGS</h2>
                  <p>Tags: <input type="text" value={this.state.data.tags} onChange={this.updateTags.bind(this)}/></p>

                  </aside>
                </div>

              </section>
          </div>
      );
    }

    removeMeta(body){

        let re = /@@[^@@]*@@/;
        body = body.replace(re, "");

        return body
    }

    createBlankNote(e){
        e.preventDefault()
        let n = this.setInitialData(null);
        this.setState({data: n, status: "original"})

        this.props.handleEditThis(e)
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

    setInitialData(note){
      let n = {
              id:"newNoteEdge",
              title:"",
              tags: "",
              type: "",
              id: "",
              body: "",
              reference: ""
          }

      if (note == undefined || note == null || note.api_request == false) {

      }else if (note.author.id !== this.props.user.id) {

      }else{

          n = {
              title: note.title,
              tags: note.tags_string,
              type: note.type,
              id: note.id,
              reference: note.verse.reference,
              tags: note.tags_string,
              body: this.removeMeta(note.body)
          }

      }

      return n;

    }

    updateBody(e){
      e.preventDefault()
      let data = this.state.data

      data.body = e.target.value

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

      let data = this.state.data
      let newMeta = '@@ \ntitle: '+ data.title +' \ntags: '+ data.tags +' \nreference: '+ data.reference +' \n@@\n';

      var body = newMeta + data.body;
      data.body = body
      this.props.handleUpdateNote(data);
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
                author{
                  id
                }

        }`,
        user: () => Relay.QL`fragment on User {
            id
            name
            email
            authenticated
        }`,
        notes: () => Relay.QL`fragment on NoteConnection {
           ${NotesWidget.getFragment('notes')}
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
