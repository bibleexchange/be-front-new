/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

class Notebook extends React.Component {
	
  render() { 
	let n = this.props;
	  
	return (
		<li><Link to={n.url}>{n.title}</Link></li>
		);
	}
} 

class Library extends React.Component {

  render() {

       return (
		<div id="minimal-list" className="container" >	
			<div>		
			
			{/*this.props.store.notebooks.map((n)=>{
				return <Notebook key={Math.random()+n.id} {...n} />;
			})*/}
			{/*	
			<button onClick={this.loadMore}>Load More {this.props.store.pageInfo.currentPage} of {this.props.store.pageInfo.numberOfPages}</button>
			*/}
			</div>			
		</div>
    )
  }

	loadMore(event){
		event.preventDefault();
		console.log('Load more someday, please!');
	}
	
}

Library.propTypes = {
    library: React.PropTypes.object.isRequired
  };
  
export default Library;
