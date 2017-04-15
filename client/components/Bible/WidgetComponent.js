import React from 'react';
import Relay from 'react-relay';
import BibleVerse from './BibleVerse';
import BibleNavigation from './Navigation';
import { Link } from 'react-router';

class BibleChapterComponent extends React.Component {

  render() {
    return (
      <div>
      	{this.props.bibleChapter.verses.edges.map(function (verse) {
        return <BibleVerse bibleVerse={verse.node} key={verse.node.id} />;
      	})}
      </div>
    );
  }

}

class WidgetComponent extends React.Component {

  render() {
    const baseUrl = this.props.baseUrl;
    let verses = [];
    let user = this.props.viewer.user;
    let nextChapterUrl = null;
    let goToNext = null;

    if (this.props.bibleChapter !== undefined && this.props.bibleChapter !== null && this.props.bibleChapter.verses !== undefined) {
      verses = this.props.bibleChapter.verses.edges;
      nextChapterUrl = this.props.bibleChapter.nextChapter.url;
      goToNext = <Link className='nextChapter' to={nextChapterUrl} >next</Link>;
    }

    let clickVerseBody = this.props.clickVerseBody;

    return (
      <div>
      	<BibleNavigation history={this.props.history} bible={this.props.bible} bibleChapter={this.props.bibleChapter} baseUrl={baseUrl} />
      	  {verses.map(function (verse) {
      		  return <BibleVerse user={user} clickVerseBody={clickVerseBody} bibleVerse={verse.node} key={verse.node.id} baseUrl={baseUrl} />;
      	  })}

          {goToNext}
      </div>
    );
  }

}

WidgetComponent.propTypes = {
  bibleChapter: React.PropTypes.object.isRequired,
  bible: React.PropTypes.object,
};

export default Relay.createContainer(WidgetComponent, {
  fragments: {
    bibleChapter: () => Relay.QL`fragment on BibleChapter {
     ${BibleNavigation.getFragment('bibleChapter')}
      nextChapter{url}
      previousChapter{url}
		verses (first:200){
		  edges {
		    cursor
		    node{
		      id
               order_by
               body
               url
               notesCount
		     }
		  }
		}
	  
      }`,
    bible: () => Relay.QL`fragment on Bible {
     ${BibleNavigation.getFragment('bible')}
   }`,

    viewer: () => Relay.QL`fragment on Viewer {
      user {
        authenticated
      }
   }`
  },
});
