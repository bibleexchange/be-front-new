import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import BibleVerse from '../../Bible/BibleVerse';
import NoteTest from '../NoteTest';

import './NoteFile.scss'

function slugIt(string) {
  return string.toLowerCase().split(' ').join('');
}

class NoteFile extends React.Component {

  render() {
    let body = JSON.parse(this.props.note.output.body)
    let present = JSON.parse(body)

    let note = this.props.note

    return (
    	<div id="note-file">
          {present.media.map(function(b,k){
            return <NoteTest  key={k} type={b.type} body={b.value}  api_request={b.api_request} note={note} full={false}/>
          })}
    	</div>
    );
  }
}

NoteFile.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(NoteFile, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      user {
        authenticated
      }
    }`,
    note: () => Relay.QL`fragment on Note {
      id
      title
      tags
      author{
        name
      }
      verse{
        id
        body
        reference
        url
        notesCount
        order_by
      }
      output{
        type
        api_request
        body
      }
    }`,
  },
});
