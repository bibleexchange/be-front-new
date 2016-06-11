import React from 'react';
import { Route, Link } from 'react-router';
import MainNavigation from '../Navbar/NavbarContainer';
import Footer from '../Footer/FooterContainer';
import { Grid, Row, Col } from 'react-bootstrap';

import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './App.scss';
import './Images.scss';
import './Print.scss';
import './Typography.scss';

const fakeStore = require('../../../server/data/fakeStore.js');
const fakeViewer = require('../../../server/data/fakeViewer.js');

class App extends React.Component {

  render() { 
	
	let viewer = this.props.viewer;//fakeViewer; /// vs. this.props.viewer
	let store = fakeStore;
	
    return (
		  <div>
				<MainNavigation location={this.props.location} route={this.props.route}  viewer={viewer} />

			  {this.props.children}
			  
			  <Footer viewer={this.props.viewer}/>
		  </div>
    );
  }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

App.propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

module.exports = App;