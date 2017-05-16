import React from 'react';
import Relay from 'react-relay';
import BibleVerse from './BibleVerse';
import BibleNavigation from './Navigation';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6

class WidgetComponent extends React.Component {

  render() {
   
    let nextChapterUrl = null;
    let goToNext = null;

      if (this.props.bibleChapter !== null && this.props.bibleChapter.nextChapter !== null) {
          nextChapterUrl = this.props.bibleChapter.nextChapter.url;
          goToNext = <Link className='nextChapter' to={nextChapterUrl} >next chapter &#8631;</Link>;
      }

    const transitionOptions = {
      transitionName: "bibley",
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnter: true,
      transitionEnterTimeout: 500,
      transitionLeave: true,
      transitionLeaveTimeout: 500
    }

    return (
      <div>
      	<BibleNavigation bible={this.props.bible} bibleChapter={this.props.bibleChapter} reference={this.props.reference} handleSearchBibleReference={this.props.handleSearchBibleReference} />
          <ul className="list-group">
           <CSSTransitionGroup {...transitionOptions} >
        	  {this.renderVerses()}
            </CSSTransitionGroup>
            </ul>
          {goToNext}
      </div>
    );
  }

  renderVerses(){
    let user = this.props.user
    let clickVerseBody = this.props.clickVerseBody
    const baseUrl = ''
    let verses = []

    if(this.props.bibleChapter !== null){
      verses = this.props.bibleChapter.verses.edges
    }
    return verses.map(function (verse) {
              return <li className="list-group-item" key={verse.node.id} ><BibleVerse user={user} clickVerseBody={clickVerseBody} bibleVerse={verse.node} baseUrl={baseUrl} /></li>;
            })
  }

}

WidgetComponent.propTypes = {
  bibleChapter: React.PropTypes.object,
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

    user: () => Relay.QL`fragment on User {
        authenticated
   }`
  },
});
