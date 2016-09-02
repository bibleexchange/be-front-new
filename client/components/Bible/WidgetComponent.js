/* eslint-disable global-require */
import React from 'react';
import BibleVerseFocus from './BibleVerseFocus';
import BibleVerse from './BibleVerse';
import BibleNavigation from './Navigation';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

import './Bible.scss';

class WidgetComponent extends React.Component {

  render() {

    return (
      <div>
		<BibleNavigation data={this.props.viewer} nextChapterUrl={this.props.bibleChapter.nextChapter[1]} searchTerm={this.props.bibleChapter.reference} previousChapterUrl={this.props.bibleChapter.previousChapter[1]}/>
		{this.props.bibleChapter.verses.map(function(verse) {
			return <BibleVerse {...verse} key={verse.id}/>;
		})}
      </div>
    );
  }

 handleNextStep(){
	
	this.props.relay.setVariables({
		stepPageSize: this.props.relay.variables.stepPageSize+1
		});
	
	console.log(this.props.relay.variables.stepPageSize, this.props.relay.variables.stepPageSize+1);
	
  }
  
} 

WidgetComponent.propTypes = {
    viewer: React.PropTypes.object.isRequired,
	bibleChapter: React.PropTypes.object.isRequired,
  };
  
export default WidgetComponent;