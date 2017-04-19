import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteThumbnail from './NoteThumbnail';
import Loading from '../ListWidget/Loading'
import './NotesWidget.scss';
import SearchBox from '../ListWidget/SearchBox'

class NotesWidget extends React.Component {

  render() {

      let notes = this.props.notes.edges;
      let selectNote = this.props.selectNote;
      let totalCount = 0

      if (this.props.notes !== undefined){
          totalCount = this.props.notes.totalCount
      }

    let details = {
      title:{
        singular: "Note",
        plural: "Notes"
      },
      totalCount: totalCount,
      filter: this.props.status.filter,
        noResultsMessage: "No notes match your search!"
    }

    return (
    		<div id='notes-widget'>

            <SearchBox
              items={this.props.notes}
              details = {details}
              status={this.props.status.status}
              handleClearFilter={this.props.handleClearNoteFilter}
              handleUpdateFilter={this.props.handleUpdateNoteFilter}
              handleNextPage={this.props.handleNextNotePage}
            />

          {notes.map((n) => {
            return <NoteThumbnail tags={n.node.tags} key={n.node.id} note={n.node} selectNote={selectNote} />;
          })};

    		</div>
    );
  }

}

NotesWidget.propTypes = {
  notes: React.PropTypes.object.isRequired,
  status: React.PropTypes.object.isRequired,
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
