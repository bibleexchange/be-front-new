import React from 'react';
import { Link } from 'react-router';
import NotePreview from './NotePreview';
import BrowserWidget from './BrowserWidget';

import './NotesWidget.scss';

export default class NotesWidgetComponent extends React.Component {

  componentWillMount(){
	this.state = {
	  showModal:false,
	  filterNotesBy:""
	};
  }

  render() {
	let filterBy = this.state.filterNotesBy.toLowerCase();
  let notes = [];

      if(this.props.viewer !== null && this.props.viewer.notes !== null){
          notes = this.props.viewer.notes.edges;
      }

       return (
    		<div>

          {/*}<BrowserWidget />*/}

    			<h2>Notes {this.props.filter}</h2>
    			<hr />
    			<input type="text" onChange={this.handleLibraryFilter.bind(this)} placeholder="  filter" value={this.state.filterNotesBy} style={{marginLeft:"50px"}}/>
    			<Link to="" onClick={this.handleClearFilter.bind(this)} >&nbsp;&nbsp;clear</Link>
    			<hr />
    			{notes.filter(function(el){return el.node.body.includes(filterBy)}).map((n)=>{
    				return <NotePreview key={n.node.id} note={n.node} />;
    			})}

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
