/* eslint-disable global-require */
import React from 'react';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';
import BookMarksWidget from './BookMarksWidget';
import Relay from 'react-relay';

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
        <BookMarksWidget user={this.props.viewer.user} navs={navs}/>
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

  export default Relay.createContainer(Dashboard, {
    initialVariables: {
      token:"dummystring"
    },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
          user(token:$token){
            ${BookMarksWidget.getFragment('user')}
            id
            authenticated
            name
            email
            navHistory(first:5){
              edges{
                cursor
                node{
                  id
                  url
                  title
                }
              }
            }
          }

      }
    `,
  },
});
