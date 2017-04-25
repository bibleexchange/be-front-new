import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import ExternalLink from './Output/ExternalLinkNote';
import BibleVerse from './Output/BibleVerse';
import DCRecording from './Output/DCRecording';
import NoteFile from './Output/NoteFile';
import marked from 'marked';
import N from '../../NoteTypes';

class NoteTest extends React.Component {
  render() {
    return <div>{this.noteTest()}</div>;
  }

  noteTest(){

    let component = null;
    let p = this.props

    switch (p.type) {

      case N.GITHUB:
        console.log(p)
        component = <div dangerouslySetInnerHTML={{ __html: p.body}} ></div>;
        break;

      case N.BIBLE_VERSE:
        component = <BibleVerse bibleVerse={p.body} request={p.api_request} fullReference={true}/>;
        break;

      case N.STRING:
        component = <div dangerouslySetInnerHTML={{ __html: p.body }} ></div>;
        break;

      case N.MARKDOWN:
        
        if(p.body === undefined){
          console.log(p)
          //component = <NoteFile note={p.note} />;
        }else{
          component = <div dangerouslySetInnerHTML={{ __html: marked(p.body) }} ></div>;
        }
        break;

      case N.FILE:
        component = <NoteFile note={p.note} />;
        break;

      case N.DC_RECORDING:

        if(p.body === undefined){
          console.log(p)
          //component = <NoteFile note={p.note} />;
        }else{
          let recording = p.body;
          component = <DCRecording recording={recording} request={p.api_request} note={p.note} full={p.full}/>;
        }

        break;

      case N.JSON:
          component = <NoteFile note={p.note} />;
          break;

      case N.SOUNDCLOUD:
          let trackNumber = p.body;
          let srcString = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + trackNumber + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
          component = <iframe width='100%' height='300px' scrolling='no' frameBorder='no' src={srcString}></iframe>;
          break;

      default:
      console.log(p.type, p.body, p.api_request)
        component = <div> {p.type} : {p.body} : {p.api_request} </div>
    }

    return (<div>{component}</div>);
  }

}

NoteTest.propTypes = {
  type: React.PropTypes.string.isRequired,
  body: React.PropTypes.object.isRequired,
  api_request: React.PropTypes.string.isRequired
};

export default Relay.createContainer(NoteTest, {
  initialVariables: {
    noteId: '55555',
  },
  fragments: {
    user: () => Relay.QL`fragment on User {
      ${DCRecording.getFragment('user')}
        authenticated
    }`,
    note: () => Relay.QL`fragment on Note {
        ${DCRecording.getFragment('note')}
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
