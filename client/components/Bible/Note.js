import React from 'react';
import { Link } from 'react-router';
import Helper from '../../util/MyHelpers';

class Note extends React.Component {
 
  render() {    
    return (
		<div style={{marginBottom:"15px"}}>
			{this.chooseView(this.props)}
		</div>
    )
  }

	chooseView(o){
	
		switch(o.object_type){
			case "Recording":
				let recording = JSON.parse(o.relatedObject);
				return <Recording data={recording[0]} noteID={o.id} />;
				break;
			case "Link":
				let link = JSON.parse(o.relatedObject);
				return <ExternalLink data={link[0]} note={o}/>;
				break;
			case "BibleVerse":
				let verse = JSON.parse(o.relatedObject);
				return (<div><span className="glyphicon glyphicon-link"></span><Link to={verse.url}> {verse.reference}</Link> <p>{verse.t}</p></div>);
				break;
			default:
				return (<Comment {...o} />);
		}
		
	}  
 
}

class Comment extends React.Component {
  render() {
    return (
		<p><i className="glyphicon glyphicon-comment"></i> {this.props.body} -- {this.props.user.username}</p>
    )
  }
  
}

class Recording extends React.Component {
  render() {
    return (
		<p><i className="glyphicon glyphicon-headphones"></i> <Link to={"/notes/"+this.props.noteID+"#"+Helper.safeUrl(this.props.data.title)} >{this.props.data.title}</Link></p>
    )
  }
  
}

class ExternalLink extends React.Component {
  render() {	  
    return (
		<div>
			<i className="glyphicon glyphicon-link"></i> 
			{this.props.note.body} 
			<Link to={this.props.data.url} > {this.props.data.url}</Link>
		</div>
    )
  }
  
}



module.exports = Note;