import React from 'react';
import { Link } from 'react-router';

class DCRecordingNoteComponent extends React.Component {

  render() {

    return (
	<div className='recording'>
    <p>{this.props.recording.text}</p>
	</div>
    );
  }
}

export default DCRecordingNoteComponent;
