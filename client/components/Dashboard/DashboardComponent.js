/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import BookMarksWidget from './BookMarksWidget';

import './Dashboard.scss';

class Dashboard extends React.Component {

  render() {
    let user = this.props.viewer.user;
    let navs = this.uniques(JSON.parse(localStorage.getItem('navs')));
    localStorage.setItem('navs',JSON.stringify(navs));
    return (
	<Page heading={''}>
 	  <div className="WidgetContainer">
	    <div className="Widget">
        <BookMarksWidget user={this.props.viewer.user} bookmarks={navs}/>
		    </div>
	  </div>
	</Page>
    );
  }

  uniques(array) {
     return Array.from(new Set(array));
  }

}

Dashboard.propTypes = {
	viewer: React.PropTypes.object.isRequired,
  };

export default Dashboard;
