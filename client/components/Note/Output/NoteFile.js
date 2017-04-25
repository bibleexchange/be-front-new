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
    let present = body;

    if(body.media !== undefined){
      present = body.media.map(function(b,k){
            return <li><NoteTest  key={k} type={b.type} body={b.body}  api_request={b.api_request} note={note} full={false}/></li>
          })
    }
    let note = this.props.note

    return (
    	<div id="note-file">
        <main>
          <ul>
            <li><h1>{note.title}</h1></li>
          {present}
          </ul>

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
