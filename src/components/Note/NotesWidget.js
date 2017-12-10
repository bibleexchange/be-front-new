import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';
import { Link } from 'react-router';
import NoteThumbnail from './NoteThumbnail';
import Loading from '../ListWidget/Loading'
import './NotesWidget.scss';
import SearchBox from '../ListWidget/SearchBox'

class NotesWidget extends React.Component {

  componentWillMount (){
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.setState ({loading: false})
  }

  componentWillReceiveProps(newProps){

    if(newProps.notes !== this.props.notes){
          let s = this.state
    s.loading = false

    this.setState(s)
    }

  }



  render() {

      let notes = [];
      let totalCount = 0
      let user = this.props.user

      if (this.props.notes !== undefined && this.props.notes !== null){
          totalCount = this.props.notes.totalCount
          notes = this.props.notes.edges? this.props.notes.edges:[]
      }

    let details = {
      title:{
        singular: "Note",
        plural: "Notes"
      },
      totalCount: totalCount,
      filter: this.props.status.filter,
        noResultsMessage: "No notes match your search!",
        currentPage: this.props.status.notesCurrentPage
    }

    let selectNote = this.props.selectNote

    return (
    		<div id='notes-widget' className={"loading-"+this.state.loading}>

            <SearchBox
              items={this.props.notes}
              details = {details}
              status={this.props.status.status}
              handleClearFilter={this.clear}
              handleUpdateFilter={this.handleUpdateNoteFilter.bind(this)}
              handleNextPage={this.handleNextPage.bind(this)}
            />

          {notes.map((n) => {
            return <NoteThumbnail user={user} tags={n.node.tags} key={n.node.id} note={n.node} selectNote={selectNote} />;
          })}

    		</div>
    );
  }

  handleNextPage(e){
    let s = this.state
    s.loading = true

    this.setState(s)

    setTimeout(function() { this.props.handleNextNotePage(e); }.bind(this), 1);
    
  }

  handleUpdateNoteFilter(e){
    let s = this.state
    s.loading = true

    this.setState(s)

    setTimeout(function() { this.props.handleUpdateNoteFilter(e); }.bind(this), 1);
    
  }

  clear(e){
    let s = this.state
    s.loading = true

    this.setState(s)

    //setTimeout(function() { this.props.handleClearNoteFilter(e); }.bind(this), 1);
    
  }

}

NotesWidget.propTypes = {
  notes: React.PropTypes.object.isRequired,
  status: React.PropTypes.object.isRequired,
    handleUpdateNoteFilter:  React.PropTypes.func.isRequired,
};

export default createFragmentContainer(NotesWidget, {

  user: graphql`
    fragment NotesWidget_user on User  {
       authenticated
       ...NoteThumbnail_user
   }`,


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
             ...NoteThumbnail_note
           }
         }
    }`,

      myNotes: () => Relay.QL`fragment on NoteConnection {
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
           }
         }
    }`
});
