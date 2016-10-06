import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import BibleWidget from './WidgetComponent';
import NotesWidget from '../Note/NotesWidget';

import './Bible.scss';
import './NotesWidget.scss';

class Bible extends React.Component {

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {

    let reference = "";

    let user = {null};
    let bibleChapter = {null};
    let bibleVerse = {null};

    if(this.props.viewer.user !== null){
      user = this.props.viewer.user;
    }

    if(this.props.viewer.bibleChapter !== null && this.props.viewer.bibleChapter !== undefined){
      bibleChapter = this.props.viewer.bibleChapter;
    }

    if(this.props.viewer.bibleVerse !== null && this.props.viewer.bibleVerse !== undefined){
      bibleVerse = this.props.viewer.bibleVerse;
    }

    if(this.props.viewer !== null && this.props.viewer.bibleVerse !== null && this.props.viewer.bibleVerse !== undefined){
      reference = this.props.viewer.bibleVerse.reference;
    }

    return (
		<div id="bible" className="WidgetContainer" >
		  <div className="Widget">
			    <BibleWidget
            history={this.props.history}
            baseUrl=""
            bible={this.props.viewer.bible}
            bibleChapter={bibleChapter}
            bibleVerse={bibleVerse}
          />
			  </div>
			  <div className="Widget">
    		  <NotesWidget
            filter={reference}
    		    viewer={this.props.viewer}
    		    selectNote={null}
            tags={true}/>
			  </div>
	 </div>
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
    filter:""
  },
  fragments: {
      viewer: () => Relay.QL`fragment on Viewer {
        ${NotesWidget.getFragment('viewer')}
        user {id}
        bibleChapter (reference:$reference) {
      	  ${BibleWidget.getFragment('bibleChapter')}
        }

        bibleVerse (reference:$reference) {
          id
          reference
          ${BibleWidget.getFragment('bibleVerse')}
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
