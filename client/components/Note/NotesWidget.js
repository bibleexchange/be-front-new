import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteThumbnail from './NoteThumbnail';
import Loading from '../ListWidget/Loading'
import './NotesWidget.scss';
import SearchBox from '../ListWidget/SearchBox'

class NotesWidget extends React.Component {

  componentWillMount() {
    let filter = '';
    let currentPage = 1;

    if (this.props.filter !== null) {
      filter = this.props.filter;
    }

    this.props.relay.setVariables({ filter: filter });

    if (this.props.viewer.notes !== undefined) {
      currentPage = this.props.viewer.notes.currentPage;
    }

	  this.state = {
	    showModal: false,
      filter: filter,
      notesCurrentPage: currentPage,
      status: null
	};
  }

  componentWillReceiveProps(newProps) {

    if (newProps.filter !== this.props.filter) {
      this.props.relay.setVariables({ filter: newProps.filter });

      this.setState({
        filter: newProps.filter,
        status: null
      });
    }else{
      this.setState({
        status: null
      });
    }
  }

  render() {

    let notes = [];
    let noNotes = <h2>No notes match your search!</h2>;
    let selectNote = this.props.selectNote;
    let totalCount = 0

    if (this.props.viewer.notes !== undefined) {
      notes = this.props.viewer.notes.edges;

      if (this.props.viewer.notes.totalCount >= 1) {
        noNotes = null;
      }

      totalCount = this.props.viewer.notes.totalCount

    }

    let details = {
      title: {
        singular: "Note",
        plural: "Notes"
      },
      totalCount: totalCount,
      filter: this.state.filter
    }

    return (
    		<div id='notes-widget'>

            <SearchBox
              items={this.props.viewer.notes}
              details = {details}
              status={this.state.status}
              handleClearFilter={this.handleClearFilter.bind(this)}
              runScriptOnPressEnter={this.runScriptOnPressEnter.bind(this)}
              handleEditFilter={this.handleEditFilter.bind(this)}
              applyFilter={this.applyFilter.bind(this)}
              handleNextPage={this.handleNextPage.bind(this)}
            />

          {notes.map((n) => {
            return <NoteThumbnail tags={n.node.tags} key={n.node.id} note={n.node} selectNote={selectNote} />;
          })};

          <div style={{ display: 'inline-block', height: '175px', lineHeight: '175px' }}>{noNotes}</div>

    		</div>
    );
  }

  handleEditFilter(event) {
    let newState = this.state;
    newState.filter = event.target.value
    this.setState(newState);
  }

  applyFilter(event) {
    this.props.relay.setVariables({
      filter: this.state.filter.toLowerCase(),
      startCursor: null
    });
    this.setState({
      notesCurrentPage: 1,
      status: 'loading...'
    });

  }

  handleClearFilter(event) {
    console.log("cllearing: ", this.state.filter)
    event.preventDefault();
    this.setState({filter:null});


    this.props.relay.setVariables({
      filter: null,
      startCursor: null
    });



  }

  handleNextPage() {
    this.props.relay.setVariables({
      startCursor: this.props.viewer.notes.pageInfo.endCursor
    });
    this.setState({ notesCurrentPage: this.state.notesCurrentPage + 1 });
  }

  runScriptOnPressEnter(e) {

    if (e.keyCode == 13) {
      console.log('enter key pressed!');
      this.applyFilter(e);
    }
  }

}

NotesWidget.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  relay: React.PropTypes.object.isRequired
};

export default Relay.createContainer(NotesWidget, {
  initialVariables: {
    startCursor: null,
    pageSize: 5,
    filter: ''
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer  {
      	 notes (filter: $filter, first:$pageSize, after:$startCursor){
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
      	       type
               tags
               ${NoteThumbnail.getFragment('note')}
             }
      	   }
	      }
     }`
  }
});
