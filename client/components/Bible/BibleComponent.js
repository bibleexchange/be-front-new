import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import BibleWidget from './WidgetComponent';
import Library from '../Library/LibraryComponent';

import './Bible.scss';

class Bible extends React.Component {

  render() {
    let navs = localStorage.getItem('navs');

    return (
	<Page heading={''}>
		<div className="WidgetContainer" >
		  <div className="Widget">
		    <BibleWidget history={this.props.history} baseUrl="" bible={this.props.viewer.bible} bibleChapter={this.props.viewer.bibleChapter} bibleVerse={this.props.viewer.bibleVerse}/>
		  </div>
		  <div className="Widget">
		    <Library bibleVerse={this.props.viewer.bibleVerse}/>
		  </div>
      <div className="Widget">
        <center>My Bookmarks</center>
        {navs}
      </div>
	    	</div>
      </Page>
    );
  }

}

Bible.propTypes = {
    viewer: React.PropTypes.object.isRequired,
};


export default Relay.createContainer(Bible, {
  initialVariables: {
	libraryFilter:'',
	reference:'john_3_16',
  	token: "nothinghere"
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
      	user(token:$token){id}
      	bibleChapter (reference:$reference) {
      	  ${BibleWidget.getFragment('bibleChapter')}
             }
              bibleVerse (reference:$reference) {
                ${Library.getFragment('bibleVerse')}
                ${BibleWidget.getFragment('bibleVerse')}
           }
      	bible {
      	  ${BibleWidget.getFragment('bible')}
      	}
      }`,
  },
});
