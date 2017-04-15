import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteThumbnail from './NoteThumbnail';
import Loading from '../ListWidget/Loading'
import './NotesWidget.scss';
import SearchBox from '../ListWidget/SearchBox'

class NotesWidget extends React.Component {

  componentWillReceiveProps(newProps) {

    if (newProps.status.filter !== this.props.status.filter) {
      this.props.handleUpdateNoteFilter(newProps.status.filter)
    }

  }

  render() {

      let notes = [];
      let noNotes = <h2>No notes match your search!</h2>;
      let selectNote = this.props.selectNote;
      let totalCount = 0

      if (this.props.notes !== undefined){
          totalCount = this.props.notes.totalCount
          notes = this.props.notes.edges
          if (this.props.notes.totalCount >= 1) {
              noNotes = null;
          }
      }

    let details = {
      title:{
        singular: "Note",
        plural: "Notes"
      },
      totalCount: totalCount,
      filter: this.props.status.filter
    }

    return (
    		<div id='notes-widget'>

            <SearchBox
              items={this.props.notes}
              details = {details}
              status={this.props.status.status}
              handleClearFilter={this.props.handleClearNoteFilter}
              handleUpdateNoteFilter={this.props.handleUpdateNoteFilter}
              handleNextPage={this.props.handleNextNotePage}
            />

          {notes.map((n) => {
            return <NoteThumbnail tags={n.node.tags} key={n.node.id} note={n.node} selectNote={selectNote} />;
          })};

          <div style={{ display: 'inline-block', height: '175px', lineHeight: '175px' }}>{noNotes}</div>

    		</div>
    );
  }

}

NotesWidget.propTypes = {
  notes: React.PropTypes.object.isRequired,
  status: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired,
    handleUpdateNoteFilter:  React.PropTypes.func.isRequired,
};

export default Relay.createContainer(NotesWidget, {
  fragments: {

      notes: () => Relay.QL`fragment on NoteConnection {
           totalCount
           perPage
           totalPagesCount
           currentPage
           pageInfo{
             hasNextPage
             endCursor
           }
      	   edges {
      	     cursor
      	     node {
      	       id
      	       title
      	       type
               tags
               ${NoteThumbnail.getFragment('note')}
             }
      	   }
      }`
  }
});
