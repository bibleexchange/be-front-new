import React from 'react';
import { Route, Link } from 'react-router';
import Relay from 'react-relay';

class JWTCallback extends React.Component {
  componentWillMount(){
	console.log(this.props);
	localStorage.setItem('jwt', this.props.location.query.token);
	this.context.router.push('/');
  }

  render() { 
    return (<div>.. .. .. ..</div>);
  }
}

JWTCallback.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

export default Relay.createContainer(JWTCallback, {
  initialVariables: {
	reference:'john_3_16',
	slug:''
  }, 
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
	id
      }
    `,
  },
});
