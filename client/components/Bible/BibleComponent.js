/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import BibleWidget from './WidgetComponent';
import Library from '../Library/LibraryComponent';

import './Bible.scss';

class Bible extends React.Component {

  componentWillMount(){

  }

  render() {
    return (
	<Page heading={''}>
		<div className="WidgetContainer">
		  <div className="Widget">
		    <BibleWidget history={this.props.history} bible={this.props.bible} bibleChapter={this.props.bibleChapter} bibleVerse={this.props.bibleVerse}/>
		  </div> 
		  <div className="Widget">
		    <Library bibleVerse={this.props.bibleVerse}/>
		  </div>
	    	</div>
      </Page>
    );
  }
  
}

Bible.propTypes = {
    bibleChapter: React.PropTypes.object.isRequired,
    bibleVerse: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
    bible: React.PropTypes.object,
};


export default Relay.createContainer(Bible, {
  initialVariables: {
	bibleChapterId:5,
	libraryFilter:'',
	reference:'john_3_16'
  }, 
  fragments: {
      viewer: () => Relay.QL`fragment on User {id}`, 
      bibleChapter: () => Relay.QL`fragment on BibleChapter {
	${BibleWidget.getFragment('bibleChapter')}
      }`,
      bibleVerse: () => Relay.QL`fragment on BibleVerse {
	${Library.getFragment('bibleVerse')}
	${BibleWidget.getFragment('bibleVerse')}
      }`,
      bible: () => Relay.QL`fragment on Bible {
	${BibleWidget.getFragment('bible')}
      }`,
  },
});
