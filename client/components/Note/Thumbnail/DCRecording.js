import React from 'react';
import { Link } from 'react-router';

class DCRecordingNoteComponent extends React.Component {

  render() {
  return (
	<div>
    <p>{this.props.recording.text}</p>
    <p>[DC Recording]</p>
	</div>
    )
  }
}

export default DCRecordingNoteComponent;
