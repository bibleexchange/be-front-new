/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import BibleVerse from './BibleVerse';
import BibleNavigation from './Navigation';
import { Link } from 'react-router';

import './Widget.scss';


class BibleChapterComponent extends React.Component {

  render() {

    return (
      <div>
      	{this.props.bibleChapter.verses.edges.map(function(verse) {
              	return <BibleVerse bibleVerse={verse.node} key={verse.node.id}/>;
      	})}
      </div>
    );
  }

}

class WidgetComponent extends React.Component {

  render() {

    const baseUrl = this.props.baseUrl;

    return (
      <div>
      	<BibleNavigation history={this.props.history} bible={this.props.bible} bibleChapter={this.props.bibleChapter} baseUrl={baseUrl}/>
      	  {this.props.bibleChapter.verses.edges.map(function(verse) {
      		return <BibleVerse bibleVerse={verse.node} key={verse.node.id} baseUrl={baseUrl}/>;
      	  })}
      </div>
    );
  }

}

WidgetComponent.propTypes = {
    bibleChapter: React.PropTypes.object.isRequired,
    bible: React.PropTypes.object,
  };

export default Relay.createContainer(WidgetComponent, {
  initialVariables: {
	bibleChapterId:5,
	libraryFilter:'',
	reference:'john_2_16',
	courseSlug:""
  },
  fragments: {
    bibleChapter: () => Relay.QL`fragment on BibleChapter {
		verses (first:200){
		  edges {
		    cursor
		    node{
		      id
		      ${BibleVerse.getFragment('bibleVerse')}
		     }
		  }

		}
	   ${BibleNavigation.getFragment('bibleChapter')}
      }`,
   bible: (variables) => Relay.QL`fragment on Bible {
     ${BibleNavigation.getFragment('bible')}
   }`,
   bibleVerse: () => Relay.QL`fragment on BibleVerse {c}`
  },
});
