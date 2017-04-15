import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import N from '../../NoteTypes';

import DCRecording from '../Note/Thumbnail/DCRecording';
import BibleVerse from '../Note/Thumbnail/BibleVerse';
import FileNoteThumbnail from '../Note/Thumbnail/FileNoteThumbnail'

import marked from 'marked';
import './NoteThumbnail.scss';

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
        if (note.output.api_request === false) { recording.body = JSON.parse(recording.body); }

        component = <DCRecording recording={recording} />;
        break;

      default:
        component = <div><p><Link to={'/notes/' + this.props.note.id}> {this.props.note.id} {this.props.note.output.type}</Link></p><p>{this.props.note.tags.map(function (t) { return ' #' + t; })}</p><p><Link to={'/users/' + this.props.note.author.id}>{this.props.note.author.name}</Link></p></div>;
    }

    let selectButton = null;
    let viewWidth = ' full';

    if (this.props.selectNote !== null) {
      selectButton = <button id={note.id} data-note={JSON.stringify(note)} className='select-note' onClick={this.props.selectNote}>select</button>;
      viewWidth = null;
    }

  	                                                                                                    return (
  		<div id={note.id} className='note-thumbnail' draggable='true' >
        <div className='output'>{component}</div>
        <button onClick={this.toggleTags.bind(this)}> tags...</button>
        <p style={tagsStyle}>{tags.map(function (t, key) {
          if (t !== '') {
            return <Link key={key} style={{ marginRight: '10px' }} to={'/notes/tag/' + t.trim()} >#{t}</Link>;
          }
        }
        )}</p>
        {selectButton}
        <Link to={'/notes/' + note.id} className={'view-it' + viewWidth}>view</Link>
  		</div>
  		);
	                                                                                                    }

  toggleTags() {
    this.setState({ tags: !this.state.tags });
  }

}

export default Relay.createContainer(NoteThumbnail, {
  fragments: {
    note: () => Relay.QL`
      fragment on Note  {
          id
          title
          tags
          verse{
            id
            url
            reference
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
