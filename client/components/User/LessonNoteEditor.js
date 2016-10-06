/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import LessonNoteUpdateMutation from './LessonNoteUpdateMutation';
import LessonNoteDestroyMutation from './LessonNoteDestroyMutation';
import Status from './StatusComponent';
import NotePreview from '../Note/NotePreview';
import TextInput from './TextInput';

class LessonNoteEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     lessonnote: {
       id: this.props.lessonnote.id,
       lesson_id: this.props.lessonnote.lesson_id,
       note_id: this.props.lessonnote.note_id,
       order_by: this.props.lessonnote.order_by
     },
     status: <Status type="done"/>,
     preview: false
   };
}

  componentWillReceiveProps(newProps){
    this.setState({
      status: <Status type="done"/>,
    });
  }

  render() {

    let previewStyle = {display:"none"};

    if(this.state.preview){
      previewStyle.display = "block";
    }

    let preview = "Something wrong with connecting with this note.";

    if(this.props.lessonnote.note !== undefined){
      preview = <div><button onClick={this.togglePreview.bind(this)} >preview {this.props.lessonnote.note.type}</button>
        <div id="preview" style={previewStyle}>
          <NotePreview note={this.props.lessonnote.note} />
        </div></div>;
    }else{
      preview = "Something wrong with connecting with this note.";
    }

      return (
        <div className="note">
          <button id="delete" onClick={this.handleDestroy.bind(this)}>&#10008;</button>
          {this.state.status}

          <TextInput label="lesson" name="lesson_id" value={this.state.lessonnote.lesson_id} handleEdit={this.handleEdit.bind(this)}/>
          <TextInput label="note" name="note_id" value={this.state.lessonnote.note_id} handleEdit={this.handleEdit.bind(this)} />
          <TextInput label="order" name="order_by" value={this.state.lessonnote.order_by} handleEdit={this.handleEdit.bind(this)} />

          <input type="submit" value={"save"} onClick={this.handleUpdate.bind(this)}/>
          {preview}
        </div>
    );
  }

  handleEdit(e){

    let p = e.target.name;

    let n = this.state.note;
    n[p] = e.target.value;

    this.setState({
    	lessonnote:n,
    	status: <Status type="changes-not-saved"/>
    	});
  }

  handleUpdate(e){
    console.log('Saving...', this.state.lessonnote);
    this.setState({status: <Status type="saving"/>});

    Relay.Store.commitUpdate(new LessonNoteUpdateMutation({
      noteChanged: this.state.lessonnote,
      lessonnote: this.props.lessonnote
    }));
  }

  handleDestroy(e){
    console.log('Destroying LessonNote...');
    this.setState({status: <Status type="saving"/>});

    Relay.Store.commitUpdate(new LessonNoteDestroyMutation({
      lessonnote: this.props.lessonnote
    }));

  }

togglePreview(){
  this.setState({preview:!this.state.preview});
}

}

LessonNoteEditor.propTypes = {
  lessonnote: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(LessonNoteEditor, {
  initialVariables: {
    null
  },
  fragments: {
      lessonnote: () => Relay.QL`fragment on LessonNote {
	       ${LessonNoteUpdateMutation.getFragment('lessonnote')}
         ${LessonNoteDestroyMutation.getFragment('lessonnote')}
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
