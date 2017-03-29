import React from 'react';
import Relay from 'react-relay';
import N from '../../NoteTypes';
import GithubForm from './Forms/GithubForm';
import BibleVerseForm from './Forms/BibleVerseForm';
import TextForm from './Forms/TextForm';
import CourseForm from './Forms/CourseForm';
import MarkdownForm from './Forms/MarkdownForm';
import RecordingForm from './Forms/RecordingForm';

class PickNoteForm extends React.Component {
  render() {
    let form = null;

    switch (this.props.type) {

      case N.GITHUB:
        form = <GithubForm handleInputChanges={this.props.handleInputChanges} inputs={this.props.inputs} />;
        break;

      case N.BIBLE_VERSE:
        form = <BibleVerseForm handleInputChanges={this.props.handleInputChanges} inputs={this.props.inputs} />;
        break;

      case N.STRING:
        form = <TextForm handleInputChanges={this.props.handleInputChanges} inputs={this.props.inputs} />;
        break;

      case N.MARKDOWN:
        form = <MarkdownForm handleInputChanges={this.props.handleInputChanges} inputs={this.props.inputs} />;
        break;

      case N.DC_RECORDING:
        form = <RecordingForm handleInputChanges={this.props.handleInputChanges} inputs={this.props.inputs} />;
        break;

      case N.COURSE:
        form = <CourseForm handleInputChanges={this.props.handleInputChanges} inputs={this.props.inputs} />;
        break;

      default:
        form = <TextForm handleInputChanges={this.props.handleInputChanges} inputs={this.props.inputs} />;
    }

    return form;
  }

}

PickNoteForm.propTypes = {
  type: React.PropTypes.string.isRequired,
  inputs: React.PropTypes.object.isRequired,
  handleInputChanges: React.PropTypes.func.isRequired,
};

export default PickNoteForm;
