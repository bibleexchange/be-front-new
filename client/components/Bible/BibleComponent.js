import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import BibleWidget from './WidgetComponent';
import NotesWidget from '../Note/NotesWidget';
import ToggleBible from './ToggleBible';
import './Bible.scss';

class Bible extends React.Component {

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

  render() {
      //console.log(this.props)
    let crossReferences = []
    let bibleChapter = this.props.bibleChapter
    let bibleVerse = this.props.bibleVerse
    let reference = this.props.reference
    let user = this.props.user
    let buttonTitle = 'notes'
    let bibleStyle = { display: 'block' }
    let notesStyle = {}
    let notesCount = 0
    let handleSearchBibleReference = this.props.handleSearchBibleReference

    if (this.props.bibleVerse !== undefined && this.props.bibleVerse !== null) {
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

    return (
		<div id='bible'>

    <div className='WidgetContainer' >

  		  <div className='Widget' style={bibleStyle}>

        {this.props.bibles.edges.map(function (bible) {
          return (<BibleWidget
            key={bible.node.id}
            bible={bible.node}
            bibleChapter={bibleChapter}
            bibleVerse={bibleVerse}
            user={user}
            reference={reference}
            handleSearchBibleReference={handleSearchBibleReference}
          />);
        })}

  			  </div>
  			  <div className='Widget' style={notesStyle}>
           <p><strong> {reference} cross references: </strong>
            {this.props.crossReferences.edges.map(function(c){
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
                handleNextNotePage={this.props.handleNextNotePage}
                handleNotesAreReady={this.props.handleNotesAreReady}
                user={this.props.user}
              />
  			  </div>

  	 </div>

     <ToggleBible title={buttonTitle} handleToggleBible={this.props.handleToggleBible} />

   </div>
    );
  }

}

Bible.propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

Bible.defaultProps = {
    bibleVerse: null,
    crossReferences: {
        edges: []
    },
    bibleChapter: {
        verses: {
            edges: []
        },
        nextChapter: {},
        previousChapter: {}
    }
}

export default Relay.createContainer(Bible, {
  fragments: {
      user: () => Relay.QL`fragment on User {
          ${BibleWidget.getFragment('user')}
          ${NotesWidget.getFragment('user')}
          id
          authenticated
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
