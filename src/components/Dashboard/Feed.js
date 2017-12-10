import React from 'react';
import { Link } from 'react-router';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay/compat';

class Feed extends React.Component {

  render() {

    return (<h1>FEED {this.props.user.email}</h1>)
  }

}

Feed.propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
};

Feed.defaultProps = {
}

export default createFragmentContainer(Feed, {
    user: () => Relay.QL`fragment on User {
        id
        authenticated
    }`

});
