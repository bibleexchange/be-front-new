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
	
  state = { loading: false };
	
  render() {

	  let getMoreButton = "loading...";
  
	  if(!this.state.loading){
		getMoreButton = null;
	  }
/*
	  if (this.props.store.courses.pageInfo.hasNextPage && !this.state.loading){
		getMoreButton = <button onClick={this.loadMore.bind(this)}>Load More</button>;
	  }
*/		
       return (
		<div id="minimal-list" className="container" >	
			<h2>Notes for {this.props.bibleVerse.reference}</h2>
			<hr />
			<input type="text" onChange={this.handleLibraryFilter.bind(this)} placeholder="  filter"></input>
			<hr />
			<div>		
			{this.props.notes.map((n)=>{
				return <Note key={n.id} {...n} />;
			})}
			
			{getMoreButton}
			
			</div>			
		</div>
    )
  }


  handleLibraryFilter(event){
		event.preventDefault();

          this.props.relay.setVariables({
              libraryFilter: event.target.value,
          });
	}
  
	loadMore(event){
		event.preventDefault();
		 if (!this.state.loading){

        this.setState({loading: true}, () => {
          this.props.relay.setVariables({
            storePageSize: this.props.relay.variables.storePageSize+5,
          }, (readyState) => {
            if (readyState.done) {
              this.setState({loading: false});
            }
          });
        });

      }
	}
	
}

Library.propTypes = {
    notes: React.PropTypes.array.isRequired,
	bibleVerse: React.PropTypes.object.isRequired
  };
  
export default Library;
