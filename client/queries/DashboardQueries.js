import Relay from 'react-relay';

export default {
   viewer: (Component) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')}
      }
    }
  `,
   store: (Component) => Relay.QL`
    query {
      store {
        ${Component.getFragment('store')}
      }
    }
  `
};