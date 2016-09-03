/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

import './Library.scss';

class Note extends React.Component {
	
  render() { 
	let body = JSON.parse(this.props.body);
	return (
		<div className="bible-note">
			<p>{body.text}</p>
			<p>{body.tags}</p>
			<p><Link to={"/users/" + this.props.user.id}>{this.props.user.name}</Link></p>
		</div>
		);
	}
} 

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
			{this.props.notes.filter(function(el){return el.body.toLowerCase().includes(filterBy)}).map((n)=>{
				return <Note key={n.id} {...n} />;
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
   notes: React.PropTypes.array.isRequired,
   bibleVerse: React.PropTypes.object.isRequired
};
  
export default Library;
