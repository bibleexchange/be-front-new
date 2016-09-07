/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Note from '../Bible/Note';

import './Library.scss';

class Library extends React.Component {	

  componentWillMount(){
	this.state = {
	  showModal:false,
	  filterNotesBy:""
	};
  }

  render() {
	let filterBy = this.state.filterNotesBy.toLowerCase();

       return (
		<div id="minimal-list" className="container" >	
			<h2>Notes for {this.props.bibleVerse.reference}</h2>
			<hr />
			<input type="text" onChange={this.handleLibraryFilter.bind(this)} placeholder="  filter" value={this.state.filterNotesBy} />
			<Link to="" onClick={this.handleClearFilter.bind(this)} >&nbsp;&nbsp;clear</Link>
			<hr />
			<div>		
			{this.props.bibleVerse.notes.filter(function(el){return el.body.toLowerCase().includes(filterBy)}).map((n)=>{
				return <Note key={n.id} note={n} />;
			})}
			
			</div>			
		</div>
    )
  }


  handleLibraryFilter(event){
   // event.preventDefault();
    this.setState({ filterNotesBy: event.target.value });
}
  
  handleClearFilter(event){
   event.preventDefault();
    this.setState({ filterNotesBy: "" });
}
}

Library.propTypes = {
   bibleVerse: React.PropTypes.object.isRequired
};

Library.defaultProps = {bibleVerse: {reference:null}};
  
export default Relay.createContainer(Library, {
  fragments: {
    bibleVerse: () => Relay.QL`
      fragment on BibleVerse  {
	 reference
	 notes {
	    id
	    body
            ${Note.getFragment('note')}
	  }
     }`
  }
});
