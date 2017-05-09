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

    let component = null
    let p = this.props
    let body = p.body

    if(p.type === N.STRING || p.type === N.MARKDOWN){

    }else if(body instanceof Object){

    }else {

      body = JSON.parse(p.body)

      if (typeof body === 'string' || body instanceof String){
        body = JSON.parse(body)
      }

    }

    switch (p.type) {

      case N.GITHUB:
        console.log(p)
        component = <div dangerouslySetInnerHTML={{ __html: body}} ></div>;
        break;

      case N.BIBLE_VERSE:
        component = <BibleVerse bibleVerse={body} request={p.api_request} fullReference={true}/>;
        break;

      case N.STRING:
        component = <div dangerouslySetInnerHTML={{ __html: body }} ></div>;
        break;

      case N.MARKDOWN:
        
        if(body === undefined){
          console.log(p)
          //component = <NoteFile note={p.note} />;
        }else{
          component = <div dangerouslySetInnerHTML={{ __html: marked(body) }} ></div>;
        }
        break;

      case N.FILE:
        component = <NoteFile note={p.note} />;
        break;

      case N.DC_RECORDING:

        if(body === undefined){
          console.log(p)
          //component = <NoteFile note={p.note} />;
        }else{
          let recording = body;
          component = <DCRecording recording={recording} request={p.api_request} note={p.note} full={p.full} user={this.props.user}/>;
        }

        break;

      case N.JSON:

          component = <NoteFile note={p.note} />;
          break;

      case N.SOUNDCLOUD:
          let trackNumber = body;
          let srcString = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + trackNumber + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
          component = <iframe width='100%' height='300px' scrolling='no' frameBorder='no' src={srcString}></iframe>;
          break;

      default:
        component = <div> {p.type} : {body} : {p.api_request} </div>
    }

    return (

      <div id="note">
        <main>
          {component}
        </main>

        <aside>

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
