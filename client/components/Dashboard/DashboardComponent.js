/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router';
import BookMarksWidget from './BookMarksWidget';
import Relay from 'react-relay';
import './Dashboard.scss';
import '../../assets/svg/be-background.svg';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
}

 componentWillMount(){
  if(this.props.viewer.user.authenticated === "false"){
    this.context.router.push('/');
  }
}

  render() {

    let user = {};
    let navs = [];

    if(this.props.viewer.user.authenticated !== "false"){
      user = this.props.viewer.user;
      navs = this.uniques(JSON.parse(localStorage.getItem('navs')));
      localStorage.setItem('navs',JSON.stringify(navs));
    }

    return (
 	  <div className="WidgetContainer">
	    <div className="Widget">
          <BookMarksWidget user={this.props.viewer.user} navs={navs}/>
	    </div>
	  </div>
    );
  }

  uniques(array) {
     return Array.from(new Set(array));
  }

}

Dashboard.contextTypes = {
   router: React.PropTypes.object.isRequired
 };

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
          user{
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
