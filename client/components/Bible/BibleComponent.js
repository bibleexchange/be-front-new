/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import BibleWidget from './WidgetComponent';
import Library from '../Library/LibraryComponent';

import './Bible.scss';

class Bible extends React.Component {

  componentWillMount(){
	  console.log(this.props);
  }

  render() {
	let notes = [];
	
	if (this.props.bibleVerse){
		notes = this.props.bibleVerse.notes;
	}else{
		notes = this.props.bibleChapter.notes;
	}
	
    return (
	<Page heading={''}>
		<div className="WidgetContainer">
		<BibleWidget className="Widget" bibleChapter={this.props.bibleChapter} viewer={this.props.viewer} relay={this.props.relay}/>
		<Library notes={notes} relay={this.props.relay} bibleVerse={this.props.bibleVerse}/>
	    	</div>
      </Page>
    );
  }
  
}

Bible.propTypes = {
	bibleChapter: React.PropTypes.object.isRequired,
	bibleVerse: React.PropTypes.object.isRequired,
	viewer: React.PropTypes.object.isRequired,
  };
  
export default Bible;
