import React from 'react';
import Relay from 'react-relay';
import N from '../../NoteTypes';

import './NoteCreator.scss';

class GithubForm extends React.Component {
  render() {
    return (
        <div>
          Github URL: <input type="text" value={this.props.inputs.raw_url} name="raw_url" onChange={this.props.handleInputChanges}/>
          tags: <input type="text" value={this.props.inputs.tags} name="tags" onChange={this.props.handleInputChanges}/>
        </div>
    );
  }
}

class BibleVerseForm extends React.Component {
  render() {
    return (
        <div>
          cross reference: <input type="text" value={this.props.inputs.reference} name="reference" onChange={this.props.handleInputChanges}/>
          tags: <input type="text" value={this.props.inputs.tags} name="tags" onChange={this.props.handleInputChanges}/>
        </div>
    );
  }
}

class TextForm extends React.Component {
  render() {
    return (
        <div>
          text: <input type="text" value={this.props.inputs.text} name="text" onChange={this.props.handleInputChanges}/>
          tags: <input type="text" value={this.props.inputs.tags} name="tags" onChange={this.props.handleInputChanges}/>
        </div>
    );
  }
}


class CourseForm extends React.Component {
  render() {
    return (
        <div>
          course id: <input type="text" value={this.props.inputs.course_id} name="course_id" onChange={this.props.handleInputChanges}/>
          tags: <input type="text" value={this.props.inputs.tags} name="tags" name="tags" onChange={this.props.handleInputChanges}/>
        </div>
    );
  }
}


class MarkdownForm extends React.Component {
  render() {
    return (
        <div>
          markdown: <input type="text" value={this.props.inputs.markdown} name="markdown" onChange={this.props.handleInputChanges} />
          tags: <input type="text" value={this.props.inputs.tags} name="tags" onChange={this.props.handleInputChanges}/>
        </div>
    );
  }
}

//handleInputChanges
class RecordingForm extends React.Component {
  render() {
    return (
        <div>
          title: <input type="text" value={this.props.inputs.title} name="title" onChange={this.props.handleInputChanges}/>
          people: <input type="text" value={this.props.inputs.people} name="people" onChange={this.props.handleInputChanges} />
          tags: <input type="text" value={this.props.inputs.tags} name="tags" onChange={this.props.handleInputChanges} />
        </div>
    );
  }
}

class NoteCreator extends React.Component {

  componentWillMount(){
    this.state = {
      type:null,
      inputs:{},
      noteTypes: Object.keys(N),
      verseId: this.props.verse_id
    };
  }

  render() {

    let form = null;
    let clearForm = null;
    let noteType = this.state.type;
    let optionsStyle = {display:"block"};

if(noteType !== null){

    switch(noteType){

      case N.GITHUB:
        form = <GithubForm handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs} />;
        break;

      case N.BIBLE_VERSE:
        form = <BibleVerseForm handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs} />;
        break;

      case N.STRING:
        form = <TextForm handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs} />;
        break;

      case N.MARKDOWN:
        form =  <MarkdownForm handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs}/>;
        break;

      case N.DC_RECORDING:
        form = <RecordingForm handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs} />;
        break;

      case N.COURSE:
        form = <CourseForm handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs} />;
        break;

      default:
        form = <TextForm handleInputChanges={this.handleInputChanges.bind(this)} inputs={this.state.inputs} />;
    }

    optionsStyle = {display:"none"};
    clearForm = <button style={{color:"red"}} onClick={this.clearForm.bind(this)}>X Clear</button>;
    form = <form onSubmit={this.handleCreateNote.bind(this)} >{form}<input type="submit" value="save" onClick={this.handleCreateNote.bind(this)} /></form>;
}else{
  optionsStyle = {display:"block"};
  clearForm = null;
}

let setNoteType = this.setNoteType.bind(this);
let selectedType = this.state.type;

    return (<div id="note-creator">
            {clearForm} {form}

          <form id="note-options" style={optionsStyle}>

            {this.state.noteTypes.map(function(type, index){
              return <p key={index} >{type}: <input type="radio" name="form_type" onClick={setNoteType} value={type} /></p>
            })}

          </form>
        </div>
    );
  }

  setNoteType(e){
    this.setState({type:e.target.value});
  }

  clearForm(e){
    this.setState({type:null, inputs:{}});
  }

  handleInputChanges(e){
    e.preventDefault();
    let newInputs = this.state.inputs;
    newInputs[e.target.name] = e.target.value;
    this.setState({inputs: newInputs});
  }

handleCreateNote(e){
  e.preventDefault();

 console.log(this.state.type, JSON.stringify(this.state.inputs));

}

}

NoteCreator.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  verse_id: React.PropTypes.string.isRequired,
};

export default Relay.createContainer(NoteCreator, {
  initialVariables: {
  	noteId: "55555",
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        user {
          id
          name
          email
        }
      }`,
    },
});
