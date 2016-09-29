import React from 'react';
import { Link } from 'react-router';
import BibleVerse from '../../Bible/BibleVerse';

function slugIt(string){
  return string.toLowerCase().split(' ').join('');
}

class DCRecordingNoteComponent extends React.Component {

  render() {

      let verse = <blockquote>{this.props.verse.reference}&mdash;<BibleVerse bibleVerse={this.props.verse} /></blockquote>;
      let notes = null;
      let links = [];
      let tags = null;
      let author = {};
      let soundCloud = null;

      if(this.props.recording.soundcloudId !== undefined){
        let trackNumber = this.props.recording.soundcloudId;
        let srcString = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+trackNumber+"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
        soundCloud =  <iframe width='100%' height='600px' scrolling='no' frameBorder='no' src={srcString}></iframe>;
      }

      if(this.props.request){
        notes = this.props.recording.text;
        links = this.props.recording.links;
        tags = this.props.recording.tags.split("#");
        author = this.props.author;
      }else{
        notes = this.props.recording.body.text;
        links = this.props.recording.body.links;
        tags = this.props.recording.body.tags.split("#");
        author = this.props.author;
      }

    return (
	<div style={{margin:"15px", fontSize:"1.3em"}}>
		<center><h1>A Deliverance Center Recording</h1></center>

    {soundCloud}

    <h2>Notes</h2>
		<p>{notes}</p>

		<h2>Scripture Reference</h2>
		{verse}

		<h2>LINKS</h2>
		<ul>
		  {links.map(function(link, key){
			return <li key={key}><a href={link}>{link}</a></li>;
		  })}
		</ul>

		<h2>TAGS</h2>
		<p>{tags.map(function(t,key){

      let x = null;
      if(t !== ''){x = <Link key={key} style={{marginRight:"10px"}} to={"/notes/tag/"+t.trim()} >#{t}</Link>;}
      return x;
    })}</p>

		<h2>AUTHOR OF THIS NOTE</h2>
		<p>{author.name}</p>

	</div>
    )
  }
}

export default DCRecordingNoteComponent;
