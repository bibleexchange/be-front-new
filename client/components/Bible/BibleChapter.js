import React from 'react';
import BibleVerseComponent from './BibleVerse';
import NoteComponent from './Note';
import { Link } from "react-router";
import { Grid, Row, Col } from 'react-bootstrap';

Array.prototype.sortOn = function(key){

	this.sort(function(a, b){
		if(a[key] < b[key]){
			return -1;
		}else if(a[key] > b[key]){
			return 1;
		}
		return 0;
	});
	
	return this;
};

class BibleChapter extends React.Component {
 
  render() {
	let BibleVerseComponents = null;
	let NoteComponents = null;
	var v = null;
	let verseLink = null;
	
	if(this.props.verses){
		BibleVerseComponents = this.props.verses.map((verse)=>{
			return <BibleVerseComponent key={verse.id} {...verse} />;
		});
	}
	
	if(this.props.notes){
		NoteComponents = this.props.notes.sortOn('verse').map((note)=>{
			let verse = note.verse;
			if(!verse.url){
				verse = JSON.parse(verse);
			}
			
			if(v !== verse.v){
				verseLink = <div><hr /><Link to={verse.url? verse.url:"/t"}><sup>v. {verse.v}</sup></Link><hr /></div>;
				v = verse.v;
			}else{
				verseLink = null;
			}	
			
			return <div key={note.id+Math.random()}>{verseLink} <NoteComponent {...note} /></div>;
		});
	}
	
    return (
		<Grid id="bible">
			<h2 id={"ch_"+this.props.id}><Link to={!this.props.url ? "":this.props.url+"#ch_"+this.props.id} data={this.props} onClick={this.props.chapterClickHandler}>{this.props.book.n} {this.props.orderBy}</Link></h2>
			<Row>
				<Col xs={12} md={8} >
					{BibleVerseComponents}
				</Col>
				<Col xs={6} md={4} >
					{NoteComponents}
				</Col>
			</Row>
		</Grid>			

    )
  }
}

module.exports = BibleChapter;