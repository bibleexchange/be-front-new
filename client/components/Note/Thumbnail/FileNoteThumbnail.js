import React from 'react';
import { Link } from 'react-router';

class FileNoteThumbnail extends React.Component {

  render() {

    return (
	<div className='file'>
    <p>"{this.props.note.title}"</p>
    <div dangerouslySetInnerHTML={{ __html: this.props.note.verse.quote }} />
	</div>
    );
  }
}

export default FileNoteThumbnail;
