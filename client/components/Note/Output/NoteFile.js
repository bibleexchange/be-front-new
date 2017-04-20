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
    let note = this.props.note
console.log(note)
    return (
    	<div id="note-file">
        <main>
    		  <h1>{note.title}</h1>

          {body.media.map(function(b,k){
            return <NoteTest key={k} type={b.type} value={b.value} api_request={b.api_request} note={note}/>;
          })}

        </main>

        <aside>

        <h2>AUTHOR</h2>
    		<p>{this.props.note.author.name}</p>

        <h2>TEXT: <Link to={this.props.note.verse.url}>{this.props.note.verse.reference}</Link></h2>
        <BibleVerse bibleVerse={this.props.note.verse} request={this.props.note.api_request} />

    		<h2>TAGS</h2>
    		<p>{this.props.note.tags.map(function (t, key) {
          let x = null;
          if (t !== '') { x = <Link key={key} style={{ marginRight: '10px' }} to={'/notes/tag/' + t.trim()} >#{t}</Link>; }
          return x;
        })}</p>

        </aside>
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
