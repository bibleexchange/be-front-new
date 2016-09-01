import React from 'react';
import { Route, Link } from 'react-router';
import MainNavigation from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterComponent';
import { Grid, Row, Col } from 'react-bootstrap';

import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './App.scss';
import './Images.scss';
import './Print.scss';
import './Typography.scss';

class App extends React.Component {

  render() { 
	
	let viewer = this.props.viewer;
	console.log("App Component props", this.props);
    return (
		  <div>
				<MainNavigation location={this.props.location} route={this.props.route} viewer={this.props.viewer}/>

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