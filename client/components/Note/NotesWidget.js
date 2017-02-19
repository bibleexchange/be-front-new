import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteThumbnail from './NoteThumbnail';

import './Loading.scss';
import './NotesWidget.scss';

class Loading extends React.Component {

  render(){

    return (<section className="ctnr">
      <div className="ldr">
        <div className="ldr-blk"></div>
        <div className="ldr-blk an_delay"></div>
        <div className="ldr-blk an_delay"></div>
        <div className="ldr-blk"></div>
      </div>
    </section>);
  }

}

class NotesWidget extends React.Component {

  componentWillMount(){

  let filterBy = null
  let currentPage = 1

  if(this.props.filter !== null){
    filterBy = this.props.filter
    this.props.relay.setVariables({filterNotesBy:filterBy})
    localStorage.setItem('notes-filter',filterBy);
  }else if(localStorage.getItem('notes-filter') !== null){
    filterBy = localStorage.getItem('notes-filter');
    this.props.relay.setVariables({filterNotesBy: filterBy});
  }

  if(this.props.viewer.notes !== undefined){
    currentPage = this.props.viewer.notes.currentPage;
  }

	this.state = {
	  showModal:false,
	  filterNotesBy:filterBy,
    notesCurrentPage : currentPage
	};
  }

  componentWillReceiveProps(newProps){

    this.setState({
      status:null
    });

    if(newProps.filter !== this.props.filter){

      this.props.relay.setVariables({filterNotesBy:newProps.filter});

      localStorage.setItem('notes-filter',newProps.filter);

      this.setState({
        filterNotesBy:newProps.filter
      });
    }

  }

  render() {
      let filterBy = this.state.filterNotesBy.toLowerCase();
      let notes = [];
      let noNotes = <h2>No notes match your search!</h2>;
      let selectNote = this.props.selectNote;
      let notesTotalCount = 0;

      if(this.props.viewer.notes !== undefined){
        notesTotalCount = this.props.viewer.notes.totalCount;
        notes = this.props.viewer.notes.edges;

        if(this.props.viewer.notes.totalCount >= 1){
          noNotes = null;
        }

      }

       return (
    		<div id="notes-widget">

          { this.decide(this, notesTotalCount) }

          {notes.map((n)=>{
             return <NoteThumbnail tags={n.node.tags} key={n.node.id} note={n.node} selectNote={selectNote}/>;
          })};

          <div style={{display:"inline-block", height:"175px", lineHeight:"175px"}}>{noNotes}</div>

    		</div>
    )
  }

  decide(that,notesTotalCount){

        let nextButtonText = '_ of _';
        let nextPageDisabled = true;

        if(that.props.viewer.notes !== undefined && that.props.viewer.notes.pageInfo.hasNextPage){
          nextPageDisabled = false
          nextButtonText = 'Page ' + that.state.notesCurrentPage + ' of ' + that.props.viewer.notes.totalPagesCount + ' ( + )';
        }else if(that.props.viewer.notes !== undefined){
          nextButtonText = that.state.notesCurrentPage + ' of ' + that.props.viewer.notes.totalPagesCount;
        }

      if(that.state.status === null){
           return (<div id="search">
                       <h3 className="note-count">{notesTotalCount} Notes</h3>
                       <Link to="" className="clearFilter" onClick={that.handleClearFilter.bind(that)} >&nbsp; &times; &nbsp;</Link>
                       <input type="text" onKeyUp={that.runScriptOnPressEnter.bind(this)} onChange={that.handleEditFilter.bind(that)} onBlur={that.applyFilter.bind(that)} placeholder="  filter" value={that.state.filterNotesBy} />
                       <button disabled={nextPageDisabled} onClick={that.handleNextPage.bind(that)}>{nextButtonText}</button>
                     </div>);
      }else {
         return (<div id="search"><Loading /></div>);
      }

  }

  handleEditFilter(event){
    this.setState({ filterNotesBy: event.target.value });
}

  applyFilter(event){
    this.props.relay.setVariables({
      filterNotesBy: this.state.filterNotesBy,
      startCursor: null
    });
    this.setState({
      notesCurrentPage: 1,
      status: 'loading...'
    });
    localStorage.setItem('notes-filter',this.state.filterNotesBy);

  }

    handleClearFilter(event){
     event.preventDefault();
      this.setState({ filterNotesBy: "" });
          this.props.relay.setVariables({
            filterNotesBy: null,
            startCursor: null
          });
  }

  handleNextPage(){
    this.props.relay.setVariables({
      startCursor: this.props.viewer.notes.pageInfo.endCursor
    });
    this.setState({notesCurrentPage: this.state.notesCurrentPage+1});
  }

  runScriptOnPressEnter(e){
    console.log("what key pressed?");
    if (e.keyCode == 13) {
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
    startCursor : null,
    pageSize: 5,
    filterNotesBy:""
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer  {
      	 notes (filter: $filterNotesBy, first:$pageSize, after:$startCursor){
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
