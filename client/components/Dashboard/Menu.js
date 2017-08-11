import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

class Menu extends React.Component {

  render() {

    let options = [
        "/me/account",
        "/me/bookmarks",
        "/me/feed",
        "/me/notes",
        "/me/courses"
      ]

    return (<div style={{backgroundColor:"white"}}>
        <h1>My Menu {this.props.user.email}</h1>

        <ul>

        <li><button id="sign-out" onClick={this.props.handleLogout} >logout </button></li>

        {options.map(function(o){
          return <li><Link to={o}>{o}</Link></li>
        })}

        </ul>

        </div>)
  }

}

Menu.propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

Menu.defaultProps = {
}

export default Relay.createContainer(Menu, {
  fragments: {
      user: () => Relay.QL`fragment on User {
          id
          email
          name
          authenticated
      }`

  },
});
