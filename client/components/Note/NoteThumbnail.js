import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import N from '../../NoteTypes';

import DCRecording from '../Note/Thumbnail/DCRecording';
import BibleVerse from '../Note/Thumbnail/BibleVerse';
import FileNoteThumbnail from '../Note/Thumbnail/FileNoteThumbnail'

import marked from 'marked';

class NoteThumbnail extends React.Component {

  componentWillMount() {
    this.state = {
      tags: false
    };
  }

  render() {
    let note = this.props.note;
    let component = null;
    let tags = [];
    let tagsStyle = {
      display: 'none'
    };

    let editButton = null

    if (this.state.tags) {
      tagsStyle.display = 'block';
    } else {
      tagsStyle.display = 'none';
    }

    if (this.props.tags) {
      tags = this.props.note.tags;
    }

    switch (note.output.type) {

      case N.GITHUB:
        component = <div dangerouslySetInnerHTML={{ __html: note.output.body }} ></div>;
        break;

      case N.BIBLE_VERSE:
        let verse = JSON.parse(note.output.body);
        component = <BibleVerse bibleVerse={verse} request={note.api_request} />;
        break;

      case N.STRING:
        component = <div dangerouslySetInnerHTML={{ __html: note.output.body }} ></div>;
        break;

      case N.MARKDOWN:
        component = <div dangerouslySetInnerHTML={{ __html: marked(note.output.body).substring(0, 400) }} ></div>;
        break;


      case N.FILE:
        component = <FileNoteThumbnail note={note} />;
        break;

        case N.JSON:
            component = <FileNoteThumbnail note={note} />;
            break;

      case N.DC_RECORDING:

        let recording = JSON.parse(note.output.body);

        component = <DCRecording recording={JSON.parse(recording)} />;
        break;

      default:
        component = <div><p><Link to={'/notes/' + note.id}> {note.id} {note.output.type}</Link></p><p>{note.tags.map(function (t) { return ' #' + t; })}</p><p><Link to={'/users/' + note.author.id}>{note.author.name}</Link></p></div>;
    }

    if(this.props.user.authenticated && note.author.id === this.props.user.id){
      editButton = <li><button  onClick={this.props.selectNote} data-id={note.id} className={'select-note'}>edit</button></li>;
    }
return (

 <div id="note">
        <main>
          <div className='output'>{component}</div>
        </main>

        <aside>

        <ul>
          <Link to={'/notes/' + note.id} className={'view-it'}>view</Link>
          {editButton}
          {/*<li><button onClick={this.toggleTags.bind(this)} className='tags'>tags</button></li>*/}
        </ul>

        <h1>'{this.props.note.title}' Noted by {this.props.note.author.name}</h1>

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

  toggleTags() {
    this.setState({ tags: !this.state.tags });
  }

}

export default Relay.createContainer(NoteThumbnail, {
  fragments: {
        user: () => Relay.QL`
      fragment on User  {
         authenticated
         id
     }`,

    note: () => Relay.QL`
      fragment on Note  {
          id
          title
          tags
          verse{
            id
            url
            reference
            quote
          }
          output {
            id
            type
            api_request
            body
          }
    	   author {
    	    id
    	    name
    	    }
     }`
  }
});
