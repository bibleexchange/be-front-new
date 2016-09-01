/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import BibleWidget from '../Bible/WidgetComponent';
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
//localStorage.setItem('bible',JSON.stringify(this.props.bible));
//localStorage.setItem('viewer',JSON.stringify(this.props.viewer));


	let viewer = this.props.viewer;
	let bible = this.props.viewer.bible;
	
    return (
      <Page heading={viewer.firstName+'\'s Dashboard'}>
				<div className="WidgetContainer">
					<Library bible={bible} relay={this.props.relay} viewer={viewer} />
					<BibleWidget className="Widget" data={bible} viewer={viewer} relay={this.props.relay}/>
	    	</div>
      </Page>
    );
  }
  
}

Dashboard.propTypes = {
	bible: React.PropTypes.object.isRequired
  };
  
export default Dashboard;
