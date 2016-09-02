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

    return (
	<Page heading={''}>
				<div className="WidgetContainer">
					<BibleWidget className="Widget" bibleChapter={this.props.bibleChapter} viewer={this.props.viewer} relay={this.props.relay}/>
					<Library bibleChapter={this.props.bibleChapter} relay={this.props.relay} />
	    	</div>
      </Page>
    );
  }
  
}

Dashboard.propTypes = {
	bibleChapter: React.PropTypes.object.isRequired,
	viewer: React.PropTypes.object.isRequired,
  };
  
export default Dashboard;
