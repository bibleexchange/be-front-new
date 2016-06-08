import Relay from 'react-relay';

export default {
  library: (Component) => Relay.QL`
    query {
	library {
        ${Component.getFragment('library')}
      }
    }
  `,
   viewer: (Component) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')}
      }
    }
  `
};