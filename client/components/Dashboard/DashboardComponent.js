/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';

import './Dashboard.scss';

class Dashboard extends React.Component {

  componentWillMount(){

  }

  render() {
	
    return (
	<Page heading={''}>
 	  <div className="WidgetContainer">
	    <div className="Widget">
		<center><h1>{this.props.viewer.name} My History</h1></center>
	  	{this.props.viewer.navHistory.map(function(el){
		  return <li key={el.id}><Link to={el.url} >{el.title}</Link></li>;
		})}
	    </div>
	  </div>
	</Page>
    );
  }
  
}

Dashboard.propTypes = {
	viewer: React.PropTypes.object.isRequired,
  };
  
export default Dashboard;
