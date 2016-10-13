import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import BibleWidget from './WidgetComponent';
import NotesWidget from '../Note/NotesWidget';

import './Bible.scss';
import './NotesWidget.scss';


class ToggleBible extends React.Component {

  render() {
    return (
		<button id="toggle-bible" className={this.props.title} onClick={this.props.handleToggleBible}>{this.props.title}</button>
    );
  }

}


class Bible extends React.Component {

  componentWillMount(){
    this.state = {
      bibleStatus: "both"
    };
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {

    let reference = "";

    let user = {null};
    let bibleChapter = {null};
    let bibleVerse = {null};
    let buttonTitle = "notes";
    let bibleStyle = {
      display:"block"
    };
    let notesStyle = {};

    if(this.state.bibleStatus === true){
      bibleStyle.display = "block";
      notesStyle.display = "none";
      buttonTitle = "notes ("+this.props.viewer.bibleVerse.notesCount+")";
    }else if(this.state.bibleStatus === false){
      bibleStyle.display = "none";
      notesStyle.display = "block";
      buttonTitle = "bible";
    }

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
		<div id="bible">

    <div className="WidgetContainer" >
  		  <div className="Widget" style={bibleStyle}>
  			    <BibleWidget
              history={this.props.history}
              baseUrl=""
              bible={this.props.viewer.bible}
              bibleChapter={bibleChapter}
              bibleVerse={bibleVerse}
              viewer={this.props.viewer}
            />
  			  </div>
  			  <div className="Widget" style={notesStyle}>
            <h3>{this.props.viewer.bibleVerse.notesCount} Notes</h3>
      		  <NotesWidget
              filter={reference}
      		    viewer={this.props.viewer}
      		    selectNote={null}
              tags={true}/>
  			  </div>
  	 </div>

     <ToggleBible title={buttonTitle} handleToggleBible={this.handleToggleBible.bind(this)}/>

   </div>
    );
  }

  handleToggleBible(e){
    this.setState({bibleStatus: !this.state.bibleStatus});
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
        ${BibleWidget.getFragment('viewer')}
        user {
          id
        }
        bibleChapter (reference:$reference) {
      	  ${BibleWidget.getFragment('bibleChapter')}
        }

        bibleVerse (reference:$reference) {
          id
          reference
          notesCount
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
