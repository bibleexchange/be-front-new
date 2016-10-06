import React from 'react';
import { Link } from 'react-router';

class DCRecordingNoteComponent extends React.Component {

  render() {

      let soundCloud = null;
      let recording = this.props.note.output.body;

      if(recording.soundcloudId !== undefined){
        let trackNumber = recording.soundcloudId;
        let srcString = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+trackNumber+"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
        soundCloud =  <iframe width='100%' height='100px' scrolling='no' frameBorder='no' src={srcString}></iframe>;
      }

        let notes = recording.text;
        let links = recording.links;
        let tags = recording.tags.split("#");
        let author = this.props.note.author;

    return (
	<div>
		<h2>A Deliverance Center Recording</h2>

    {soundCloud}

		<p>Note made by: {author.name} : {notes}</p>

		<ul>
		  {links.map(function(link, key){
			return <li key={key}><a href={link}>{link}</a></li>;
		  })}
		</ul>

		<p>TAGS: {tags.map(function(t,key){

      let x = null;
      if(t !== ''){x = <Link key={key} style={{marginRight:"10px"}} to={"/notes/tag/"+t.trim()} >#{t}</Link>;}
      return x;
    })}</p>

	</div>
    )
  }
}

export default DCRecordingNoteComponent;
