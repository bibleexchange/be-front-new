import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import BibleVerse from '../../Bible/BibleVerse';

function slugIt(string) {
  return string.toLowerCase().split(' ').join('');
}

class DCRecordingNoteComponent extends React.Component {

  render() {
    let verse = null
    let tags = []
    let author = null

    if(this.props.note !== "undefined"){
      console.log("why is this running???")
        verse = <blockquote>{this.props.note.verse.reference}&mdash;<BibleVerse bibleVerse={this.props.note.verse} viewer={this.props.viewer} /></blockquote>;
        tags = this.props.note.tags;
        author = this.props.note.author;
    }

    let notes = this.props.recording.text;
    let links = this.props.recording.links ? this.props.recording.links : [];

    let soundCloud = null;

    if (this.props.recording.soundcloudId !== undefined) {
      let trackNumber = this.props.recording.soundcloudId;
      let srcString = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + trackNumber + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
      soundCloud = <iframe width='100%' height='600px' scrolling='no' frameBorder='no' src={srcString}></iframe>;
    }

    return (
	<div>
		<center><h1>A Deliverance Center Recording</h1></center>

    {soundCloud}

    <h2>Notes</h2>
		<p>{notes}</p>

		<h2>Scripture Reference</h2>
		{verse}

		<h2>LINKS</h2>
		<ul>
		  {links.map(function (link, key) {
			  return <li key={key}><a href={link}>{link}</a></li>;
		  })}
		</ul>

		<h2>TAGS</h2>
		<p>{tags.map(function (t, key) {
  let x = null;
  if (t !== '') { x = <Link key={key} style={{ marginRight: '10px' }} to={'/notes/tag/' + t.trim()} >#{t}</Link>; }
  return x;
})}</p>

		<h2>AUTHOR OF THIS NOTE</h2>
		<p>{author.name}</p>

	</div>
    );
  }
}

DCRecordingNoteComponent.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
  recording: React.PropTypes.object.isRequired
};

export default Relay.createContainer(DCRecordingNoteComponent, {
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
      user {
        authenticated
      }
    }`,
    note: () => Relay.QL`fragment on Note {
      id
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
