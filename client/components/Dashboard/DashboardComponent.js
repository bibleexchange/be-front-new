/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';

import './Dashboard.scss';

class Dashboard extends React.Component {

  componentWillMount(){
	  console.log(this.props);
  }

  render() {

    return (
	<Page heading={'Dashboard'}>
		<div className="WidgetContainer">
		{this.props.viewer.name}
		</div>
	</Page>
    );
  }
  
}

Dashboard.propTypes = {
	viewer: React.PropTypes.object.isRequired,
  };
  
export default Dashboard;
