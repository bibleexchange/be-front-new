import React from 'react';
import { Link } from 'react-router';

class FileNoteThumbnail extends React.Component {

  render() {
    let body = JSON.parse(this.props.note.output.body)
    return (
	<div className='file'>
    <p>{body.title}</p>
    <p>{body.description}</p>
    <p>tags: {this.props.note.tags.map(function(t){
      return " #" + t;
    })}</p>
	</div>
    );
  }
}

export default FileNoteThumbnail;
