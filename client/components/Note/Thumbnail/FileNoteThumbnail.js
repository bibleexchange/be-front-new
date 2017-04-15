import React from 'react';
import { Link } from 'react-router';

class FileNoteThumbnail extends React.Component {

  render() {

    return (
	<div className='file'>
    <p>{this.props.note.title}</p>
    <p>tags: {this.props.note.tags.map(function(t){
      return " #" + t;
    })}</p>
	</div>
    );
  }
}

export default FileNoteThumbnail;
