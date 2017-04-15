import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import BibleWidget from './WidgetComponent';
import NotesWidget from '../Note/NotesWidget';
import ToggleBible from './ToggleBible';
import './Bible.scss';

class Bible extends React.Component {

  componentWillMount() {
      let e = {
        target: {
          dataset: {
            reference: this.props.params.reference
          }
        }
      }
      this.props.handleChangeReference(e);
      this.props.handleChangeNoteFilter(e);

  }

    componentWillReceiveNewProps(newProps) {

      if(newProps.params.reference !== this.props.params.reference){
          let e = {
              target: {
                  dataset: {
                      reference: this.props.params.reference
                  }
              }
          }
          this.props.handleChangeReference(e);
          this.props.handleUpdateNoteFilter(this.props.params.reference)
      }



    }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    let bibles = [];
    let crossReferences = []
    let bibleChapter = {}
    let bibleVerse = null;
    let reference = '';
    let history = this.props.history;
    let viewer = this.props.viewer;
    let user = { null };
    let buttonTitle = 'notes';
    let bibleStyle = { display: 'block' };
    let notesStyle = {};
    let notesCount = 0;
    let errorMessage = null;

    if (this.props.bibles !== undefined) {
      bibles = this.props.bibles.edges;
    }

      if (this.props.crossReferences !== undefined) {
          crossReferences = this.props.crossReferences.edges;
      }

    if (this.props.viewer.user !== null) {
      user = this.props.viewer.user;
    }

    if (this.props.bibleChapter !== undefined) {
      bibleChapter = this.props.bibleChapter;
    }

    if (this.props.bibleVerse !== undefined && this.props.bibleVerse !== null) {
      bibleVerse = this.props.bibleVerse
      reference = this.props.bibleVerse.reference
      notesCount = this.props.bibleVerse.notesCount
    }

    if (this.props.bibleStatus === true) {
      bibleStyle.display = 'block';
      notesStyle.display = 'none';
      buttonTitle = 'notes (' + notesCount + ')';
    } else if (this.props.bibleStatus === false) {
      bibleStyle.display = 'none';
      notesStyle.display = 'block';
      buttonTitle = 'bible';
    }

    if (this.props.viewer.error !== null && this.props.viewer.error.code !== 200) {
      if (this.props.online === false) {
        errorMessage = <div id='im-online' className='onlinefalse'><h2>ERROR CODE: {this.props.viewer.error.code} {this.props.viewer.error.message}</h2></div>;
      } else {
        errorMessage = <div id='im-online' className='onlinetrue'><h2>ERROR CODE: {this.props.viewer.error.code} {this.props.viewer.error.message}</h2></div>;
      }
    }

    return (
		<div id='bible'>

    <div className='WidgetContainer' >

  		  <div className='Widget' style={bibleStyle}>

        {bibles.map(function (bible) {
          return (<BibleWidget
            key={bible.node.id}
            history={history}
            baseUrl=''
            bible={bible.node}
            bibleChapter={bibleChapter}
            bibleVerse={bibleVerse}
            viewer={viewer}
          />);
        })}

  			  </div>
  			  <div className='Widget' style={notesStyle}>
           <p><strong> {reference} cross references: </strong> 
            {crossReferences.map(function(c){
              let verses = ''
              c.node.verses.edges.map(function(v){
                verses += v.node.order_by + " " + v.node.body + " "
              })

              return <Link key={c.node.id} to={c.node.url} title={verses} >| {c.node.reference} </Link>;
            })}
            </p>

      		  <NotesWidget
            status={this.props.notesWidget}
            notes={this.props.notes}
            selectNote={null}
            tags
            handleUpdateNoteFilter={this.props.handleUpdateNoteFilter}
          handleClearNoteFilter={this.props.handleClearNoteFilter}
          handleNextNotePage={this.props.handleNextNotePage}
            handleNotesAreReady={this.props.handleNotesAreReady}
              />
  			  </div>

  	 </div>

     <ToggleBible title={buttonTitle} handleToggleBible={this.props.handleToggleBible} />
     {errorMessage}
   </div>
    );
  }

}

Bible.propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};


export default Relay.createContainer(Bible, {
    initialVariables: {
        noteId: 'newNoteEdge',
        filter:'',
        userNotesCount: 5,
        reference: 'john_3_16',
        startCursor: '',
        pageSize: 5,
        bibleVersion: 'kjv',
        versesPageSize: 200
    },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        
        ${BibleWidget.getFragment('viewer')}
        
        user {
          authenticated
        }
        error{
          message
          code
        }
        user {
          id
        }
 
      }`,
    notes: () => Relay.QL`fragment on NoteConnection {
         ${NotesWidget.getFragment('notes')}
      }`,
      bibles: () => Relay.QL`fragment on BibleConnection {
            
          pageInfo{
            hasNextPage
            hasPreviousPage
          }
          edges{
            cursor
            node{
              id
              ${BibleWidget.getFragment('bible')}
            }
          }
      }`,
    bibleVerse: () => Relay.QL`fragment on BibleVerse {
              id
              reference
              notesCount
              notes(first:$pageSize){
                edges{
                  node{
                    id
                    title
                  }
                }
          }
      }`,
    crossReferences: () => Relay.QL`fragment on CrossReferenceConnection {
                pageInfo{hasNextPage}
                edges{
                    node {
                    id
                    url
                    reference
                          verses(first:20){
                            edges{
                              node{
                                id
                                order_by
                                body
                              }
                            }
                          }
                        }

                    }
                }`,
    bibleChapter: () => Relay.QL`fragment on BibleChapter {

                    ${BibleWidget.getFragment('bibleChapter')}
                    id
                    url
                    reference
                          verses(first:20){
                            edges{
                              node{
                                id
                                order_by
                                body
                              }
                            }
                     }    
                }`

  },
});