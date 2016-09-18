import React from 'react';
import { Route, Link } from 'react-router';
import MainNavigation from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterComponent';
import Relay from 'react-relay';

import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './App.scss';
import './Images.scss';
import './Print.scss';
import './Typography.scss';

class App extends React.Component {

    render() {

    return (
		  <div>
			<MainNavigation location={this.props.location} updateIt={this.state} route={this.props.route} user={this.props.viewer.user} handleUpdateBookmarks={this.handleUpdateBookmarks.bind(this)}/>
			  {this.props.children}

			  <Footer user={this.props.viewer.user}/>
		  </div>
    );
  }

  handleUpdateBookmarks(string){
    this.setState({string});
  }

}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

App.propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

export default Relay.createContainer(App, {
  initialVariables: {
    token:"dummystring"
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
          user(token:$token){
            email
            ${MainNavigation.getFragment('user')}
            ${Footer.getFragment('user')}
          }

      }
    `,
  },
});
