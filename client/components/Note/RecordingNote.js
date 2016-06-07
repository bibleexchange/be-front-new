import React from 'react';
import SoundCloudPlayer from '../SoundcloudPlayer';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
const clientId = '4f6c17d18260e9acaecec51809a1ff88'; //SECRET: c8984c019d4e450e2fd4f08fb4be0529

class RecordingNote extends React.Component {
  render() {	
	
	let note = this.props.data;
	let rec = this.props.data.relatedObject;

    return (
			<Grid fluid>
			<Row>
				<Col xs={6} md={4} >
					{this.getDefaultImage(rec)}
				</Col>
				<Col xs={12} md={8} >
					{this.getRecording(rec)}
					{note.body}<br /> 
					<Link to={note.verse? note.verse.url:""}>{note.verse?note.verse.reference:""}</Link> {note.verse?note.verse.t:""}
				</Col>
			</Row>
			
			{this.getFormats(rec)}			
		</Grid>		
    )
  }
 
 getDefaultImage(recording){
	if(recording !== undefined && recording.defaultImage !== undefined){
		return (<img src={recording.defaultImage.src} 
				description={recording.defaultImage.name} 
				alt={recording.defaultImage.alt_text}
			/>);
	 }
 }
 
 getRecording(rec){
	 if(rec !== undefined){
		 return (<h2><i className="glyphicon glyphicon-headphones"></i> {rec.title}</h2>);
	 }
 }
 
 getFormats(rec){
	 if(rec !== undefined){
		 return(
		 rec.formats.map(function(f){
		
				let player = '';
				
				if(f.host === "soundcloud"){
					player = <SoundCloudPlayer clientId={clientId} resolveUrl={"https://api.soundcloud.com/tracks/"+f.file} />;
				}
				
				return (
					<Row key={f.id}>
						<Col xs={12} md={12} >
							{player}
						</Col>
					</Row>
					);
			})
		 );
	 }
 }
 
}

module.exports = RecordingNote;