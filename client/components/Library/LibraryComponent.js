/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

class Course extends React.Component {
	
  render() { 
	let c = this.props;
	  
	return (
		<li><Link to="/fff">{c.title}</Link></li>
		);
	}
} 

class Library extends React.Component {
	
  state = { loading: false };
	
  render() {
		
	  let vs = this.props.relay.variables;
		
	  let getMoreButton = "loading...";
  
	  if(!this.state.loading){
		getMoreButton = null;
	  }

	  if (this.props.viewer.courses.pageInfo.hasNextPage && !this.state.loading){
		getMoreButton = <button onClick={this.loadMore.bind(this)}>Load More</button>;
	  }
		
       return (
		<div id="minimal-list" className="container" >	
			<h2>Courses Library (searchable/filterable & paginated interface to discover courses)</h2>
			<hr />
			<div>		
			<input type="text" onChange={this.handleLibraryFilter.bind(this)}></input>
			{this.props.viewer.courses.edges.map((c)=>{
				return <Course key={c.node.id} {...c.node} />;
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
    viewer: React.PropTypes.object.isRequired
  };
  
export default Library;
