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
    let fullDetails = null

    if(this.props.note !== undefined){
        verse = <Link to={this.props.note.verse.url}>{this.props.note.verse.reference}</Link>;
    }

    let notes = this.props.recording.text;
    let links = this.props.recording.links ? this.props.recording.links : [];

    let soundCloud = null;

    if (this.props.recording.soundcloudId !== undefined) {
      let trackNumber = this.props.recording.soundcloudId;
      let srcString = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + trackNumber + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
      soundCloud = <iframe width='100%' height='600px' scrolling='no' frameBorder='no' src={srcString}></iframe>;
    }

    if(this.props.full){
      fullDetails = <div>
          <h2>LINKS</h2>
          <ul>
            {links.map(function (link, key) {
              return <li key={key}><a href={link}>{link}</a></li>;
            })}
          </ul>
      </div>
    }

    return (
	<div id="recording">
		<h2>A Sermon Recorded at Deliverance Center</h2>

    {soundCloud}

		<p>{notes}</p>

    {fullDetails}

	</div>
    );
  }
}

DCRecordingNoteComponent.propTypes = {
  user: React.PropTypes.object.isRequired,
  note: React.PropTypes.object.isRequired,
  recording: React.PropTypes.object.isRequired
};

export default Relay.createContainer(DCRecordingNoteComponent, {
  fragments: {
    user: () => Relay.QL`fragment on User {
        authenticated
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
