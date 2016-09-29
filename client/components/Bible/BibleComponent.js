import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import BibleWidget from './WidgetComponent';
import NotesWidget from '../Bible/NotesWidget';

import './Bible.scss';

class Bible extends React.Component {

  render() {
    let navs = localStorage.getItem('navs');
    let reference = "";

    if(this.props.viewer !== null && this.props.viewer.bibleVerse !== null){
      reference = this.props.viewer.bibleVerse.reference;
    }
    
    return (
	<Page heading={''}>
		<div className="WidgetContainer" >
		  <div className="Widget">
			    <BibleWidget history={this.props.history} baseUrl="" bible={this.props.viewer.bible} bibleChapter={this.props.viewer.bibleChapter} bibleVerse={this.props.viewer.bibleVerse}/>
			  </div>
			  <div className="Widget">
		      <NotesWidget filter={reference} viewer={this.props.viewer.bibleVerse} />
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
  	reference:'john_3_16',
    token: "nothinghere",
    startCursor : "",
    pageSize: 5,
    filter:"Genesis 1:2"
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        user {id}

        bibleChapter (reference:$reference) {
      	  ${BibleWidget.getFragment('bibleChapter')}
        }

        bibleVerse (reference:$reference) {
          id
          reference
          ${BibleWidget.getFragment('bibleVerse')}
	        ${NotesWidget.getFragment('viewer')}
          notes(first:$pageSize){
            edges{
              node{
                id
              }
            }
          }

        }
      	bible {
      	  ${BibleWidget.getFragment('bible')}
      	}
      }`,
  },
});
