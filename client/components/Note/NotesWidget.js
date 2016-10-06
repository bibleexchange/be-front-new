import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import NoteThumbnail from './NoteThumbnail';

class NotesWidget extends React.Component {

  componentWillMount(){

  let filterBy = this.props.relay.variables.filterNotesBy;

	if(this.props.relay.variables.filterNotesBy == ""){
	  this.props.relay.setVariables({filterNotesBy :this.props.filter});
    filterBy = this.props.filter;
	}

	this.state = {
	  showModal:false,
	  filterNotesBy:filterBy
	};
  }

  componentWillReceiveProps(newProps){
    if(newProps.filter !== this.props.filter){

      this.props.relay.setVariables({filterNotesBy:newProps.filter});

      this.setState({
        filterNotesBy:newProps.filter
      });
    }

  }

  render() {
      let filterBy = this.state.filterNotesBy.toLowerCase();
      let notes = [];
      let selectNote = this.props.selectNote;

      if(this.props.viewer !== null && this.props.viewer.notes !== null && this.props.viewer.notes !== undefined){
          notes = this.props.viewer.notes.edges;
      }

      let nextPage = null;

      if(this.props.viewer.notes.pageInfo.hasNextPage){
        nextPage = <button onClick={this.handleNextPage.bind(this)}>{this.props.relay.variables.pageSize} more</button>;
      }

       return (
    		<div id="notes-widget">
          <div id="search">
    			    <Link to="" onClick={this.handleClearFilter.bind(this)} >&nbsp; &times; &nbsp;</Link>
              <input type="text" onKeyUp={this.runScriptOnPressEnter.bind(this)} onChange={this.handleEditFilter.bind(this)} onBlur={this.applyFilter.bind(this)} placeholder="  filter" value={this.state.filterNotesBy} />
              {nextPage}
          </div>
    			{notes.map((n)=>{
    				return <NoteThumbnail tags={this.props.tags} key={n.node.id} note={n.node} selectNote={selectNote}/>;
    			})}

    		</div>
    )
  }

  handleEditFilter(event){
    this.setState({ filterNotesBy: event.target.value });
}

  applyFilter(event){
    this.props.relay.setVariables({
      filterNotesBy: this.state.filterNotesBy
    });

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
    console.log(this.props.viewer.notes.pageInfo);
    this.props.relay.setVariables({
      startCursor: this.props.viewer.notes.pageInfo.endCursor
    });
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
           pageInfo{
             hasNextPage
             endCursor
           }
      	   edges {
      	     cursor
      	     node {
      	       id
      	       type
               ${NoteThumbnail.getFragment('note')}
             }
      	   }
	      }
     }`
  }
});
