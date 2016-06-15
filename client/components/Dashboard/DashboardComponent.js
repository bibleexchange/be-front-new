/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import CourseWidget from '../Course/WidgetComponent';
import Library from '../Library/LibraryComponent';

import './Banner.scss';
import './Dashboard.scss';
import './Landing.scss';

import ThemeSquares from './ThemeSquares';

var twitterLogo = require('../../assets/svg/twitter-logo.svg');
var facebookLogo = require('../../assets/svg/facebook-logo.svg');
 
var fakeStore = require('../../../server/data/fakeStore.js');
var fakeViewer = require('../../../server/data/fakeViewer.js');

class Dashboard extends React.Component {
 
  render() {
//localStorage.setItem('store',JSON.stringify(this.props.store));
//localStorage.setItem('viewer',JSON.stringify(this.props.viewer));

	//let viewer = this.props.viewer;//fakeViewer;
	//let store = this.props.store;
	
    return (
     // <Page heading={viewer.firstname+'\'s Dashboard'}>
		<div className="WidgetContainer">
		{/*<<Library relay={this.props.relay} viewer={viewer} />
		CourseWidget className="Widget" course={store.course} viewer={viewer} relay={this.props.relay}/>*/}
	    </div>
      //</Page>
    );
  }
  
}

Dashboard.propTypes = {
	viewer: React.PropTypes.object.isRequired
  };
  
export default Dashboard;
