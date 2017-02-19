import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import N from '../../NoteTypes';
import NoteUpdateMutation from './NoteUpdateMutation';
import NoteDestroyMutation from './NoteDestroyMutation';
import Status from '../User/StatusComponent';
import PickNoteForm from './PickNoteForm';

import './NoteUpdater.scss';

class Missing extends React.Component {
  render() {
      return (
      <div id="note-updater">
        <h1>This note does not exist. Try <Link to={"/notes"}>searching</Link> for something else.</h1>;
      </div>
    );
  }
}


class Found extends React.Component {

  componentWillMount(){
    let note = this.clone(this.props.note);
    this.state = {
      note:note,
      inputs:this.setBody(note),
      noteTypes: Object.keys(N),
      verseId: this.props.bibleVerse.id,
      status: 'original'
    };

  }

  componentWillReceiveProps(newProps){

    if(newProps.note.id !== this.props.note.id){

      let note = this.clone(newProps.note);

      this.setState({
        status: <Status type="done"/>,
        note: note,
        inputs:this.setBody(note),
      });
    }else{
      this.setState({
        status: <Status type="done"/>
      });
    }


  }

  render() {
    let note = this.state.note;
    let setNoteType = this.setNoteType.bind(this);
    let shouldIHide = '';

    if(this.state.status === "original"){
      shouldIHide = ' hidden';
    }

    return (<div id="note-updater">

          <Link style={{display:"block", textAlign:"center",width:"100%", height:"25px", backgroundColor:"transparent"}} to={"/notes/"+this.props.note.id}>view</Link>

          <form id="note-options" >

            <select id="form-type" name="form_type" defaultValue={note.type} onClick={this.setNoteType.bind(this)}>
            {this.state.noteTypes.map(function(type, index){
              return <option key={index} name="form_type" onClick={setNoteType} value={type}>{type}</option>
            })}
            </select>
          </form>

            <Status type={this.state.status}/>

             <form onSubmit={this.handleUpdateNote.bind(this)} >
              <PickNoteForm type={note.type} handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs}/>
             </form>

             <div id="actions" >
              <button className="delete" onClick={this.deleteNoteConfirm.bind(this)}>&#x2718; delete</button>
              <button className={"clear"+shouldIHide} onClick={this.clearForm.bind(this)}>&#x21E0; clear changes</button>
              <button className={"save"+shouldIHide} onClick={this.handleUpdateNote.bind(this)} >&#x271A; save</button>
             </div>

        </div>
    );
  }

  setNoteType(e){
    let note = this.state.note;
    note.type = e.target.value;

    let status = "changes-not-saved";

    if(JSON.stringify(note) == JSON.stringify(this.props.note)){
      status = "original";
    }

    this.setState({
      note:note,
      status: status
    });
  }

  clearForm(e){

    let note = this.clone(this.props.note);

    this.setState({
      note: note,
      inputs:this.setBody(note),
      status: "original"
    });
    let form = document.getElementById('note-options');
    let select =  document.getElementById('form-type');
    select.value = note.type;
  }

clone(object){
  return JSON.parse(JSON.stringify(object));
}

  handleInputChanges(e){
    e.preventDefault();
    let newInputs = this.state.inputs;
    newInputs[e.target.name] = e.target.value;

    let status = "changes-not-saved";

    if(JSON.stringify(newInputs) == JSON.stringify(this.setBody(this.props.note))){
      status = "original";
    }

    this.setState({
      inputs: newInputs,
      status: status
    });
  }

handleUpdateNote(e){
  e.preventDefault();
  this.setState({status: "saving"});
  let body = null;
  let inputs = this.state.inputs;
  let tags = this.state.inputs.tags;
  let type = this.state.note.type;

  if(type === "STRING"){
    body = inputs.text;
  }else{
    body = JSON.stringify(inputs);
  }

   let note = {
     id: this.props.note,
     type: type,
     body: body,
     tags_string: tags
   };

   console.log('Saving Note...', note);

  Relay.Store.commitUpdate(new NoteUpdateMutation({
     newNote: note,
     bibleVerse: this.props.bibleVerse,
     note: this.props.note
   }));

 }

 deleteNoteConfirm(e){
   e.preventDefault();
   this.setState({status: "saving"});
   console.log('Are you sure you want to Deleting Note...');

   this.handleDeleteNote(e);
  }

 handleDeleteNote(e){
   e.preventDefault();
   this.setState({status: "saving"});
   console.log('Deleting Note...', this.props.note);

   Relay.Store.commitUpdate(new NoteDestroyMutation({
      note: this.props.note,
      viewer: this.props.viewer
    }));

  }

 setBody(note){

   let body = '';

   if(this.props.note.type !== "STRING") {
     body = JSON.parse(this.props.note.body);

       if(body.links !== undefined){
         let links = '';

         body.links.map(function(l){
           links += l+", ";
         });

         body.links = links;
       }
   }else{
     body = {
       text: this.props.note.body
     };
   }

   body.tags = this.props.note.tags_string;

   return body;

 }

}

class NoteUpdater extends React.Component {

  render() {
    let component = null;

    if(this.props.note !== null){
      component = <Found {...this.props}/>
    }else{
      component = <Missing />
    }

    return (<div>{component}</div>
    );
  }
}

NoteUpdater.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  bibleVerse: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NoteUpdater, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        user {
          id
          name
          email
        }
      }`,
    bibleVerse: () => Relay.QL`fragment on BibleVerse {
      id
      notesCount
      }`,
    note: () => Relay.QL`fragment on Note {
      ${NoteUpdateMutation.getFragment('note')}
      ${NoteDestroyMutation.getFragment('note')}
      id
      type
      body
      tags_string
      }`,
    },
});
