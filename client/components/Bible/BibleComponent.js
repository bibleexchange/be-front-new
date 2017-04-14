import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import BibleWidget from './WidgetComponent';
import NotesWidget from '../Note/NotesWidget';
import ToggleBible from './ToggleBible';
import './Bible.scss';

class Bible extends React.Component {

  componentWillMount() {
    this.state = {
      online: this.props.online,
      bibleStatus: 'both'
    };
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    let bibles = [];
    let bibleChapter = this.props.viewer.bibleChapters;
    let bibleVerse = this.props.viewer.bibleVerses;
    let reference = '';
    let history = this.props.history;
    let viewer = this.props.viewer;
    let user = { null };
    let buttonTitle = 'notes';
    let bibleStyle = { display: 'block' };
    let notesStyle = {};
    let notesCount = 0;
    let errorMessage = null;

    if (this.props.viewer.bibles !== undefined) {
      bibles = this.props.viewer.bibles.edges;
    }

    if (this.props.viewer.user !== null) {
      user = this.props.viewer.user;
    }

    if (this.props.viewer.bibleChapters !== undefined && this.props.viewer.bibleChapters.edges.length > 0) {
      bibleChapter = this.props.viewer.bibleChapters.edges[0].node;
    }

    if (this.props.viewer.bibleVerses !== undefined && this.props.viewer.bibleVerses.edges.length > 0) {
      bibleVerse = this.props.viewer.bibleVerses.edges[0].node;
      reference = this.props.viewer.bibleVerses.edges[0].node.reference;
      notesCount = this.props.viewer.bibleVerses.edges[0].node.notesCount;
    }

    if (this.state.bibleStatus === true) {
      bibleStyle.display = 'block';
      notesStyle.display = 'none';
      buttonTitle = 'notes (' + notesCount + ')';
    } else if (this.state.bibleStatus === false) {
      bibleStyle.display = 'none';
      notesStyle.display = 'block';
      buttonTitle = 'bible';
    }

    if (this.props.viewer.error !== null && this.props.viewer.error.code !== 200) {
      if (this.state.online === false) {
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
            {this.props.viewer.crossReferences.edges.map(function(c){
              let verses = ''
              c.node.verses.edges.map(function(v){
                verses += v.node.order_by + " " + v.node.body + " "
              })

              return <Link key={c.node.id} to={c.node.url} title={verses} >| {c.node.reference} </Link>;
            })}
            </p>

      		  <NotesWidget
            filter={reference}
            viewer={this.props.viewer}
            selectNote={null}
            tags
              />
  			  </div>

  	 </div>

     <ToggleBible title={buttonTitle} handleToggleBible={this.handleToggleBible.bind(this)} />
     {errorMessage}
   </div>
    );
  }

  handleToggleBible(e) {
    this.setState({ bibleStatus: !this.state.bibleStatus });
  }

}

Bible.propTypes = {
  viewer: React.PropTypes.object.isRequired,
};


export default Relay.createContainer(Bible, {
  initialVariables: {
  	reference: 'john_3_16',
    token: 'nothinghere',
    startCursor: '',
    pageSize: 5,
    filter: '',
    bibleVersion: 'kjv',
    versesPageSize: 200
  },
  fragments: {
    viewer: () => Relay.QL`fragment on Viewer {
        user {
          authenticated
        }
        ${NotesWidget.getFragment('viewer')}
        ${BibleWidget.getFragment('viewer')}
        error{
          message
          code
        }
        user {
          id
        }
        bibleChapters (first:1, filter:$reference) {
          edges{
            cursor
            node{
      	       ${BibleWidget.getFragment('bibleChapter')}
            }
          }
        }
 
 crossReferences(first: 20, filter: $reference) {
      edges {
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
          }    

        bibleVerses (first:$versesPageSize, filter:$reference) {
          pageInfo{
            hasNextPage
            hasPreviousPage
          }
          edges{
            cursor
            node{
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
          }
        }

        bibles (first:1, filter:$bibleVersion) {
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
        }
      }`,
  },
});
