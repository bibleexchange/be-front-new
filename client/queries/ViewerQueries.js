import Relay from 'react-relay';

export default {
  viewer: (Component) => Relay.QL`
	query {
      viewerQuery{
        ${Component.getFragment('viewer')}
      }
    }`
}; 