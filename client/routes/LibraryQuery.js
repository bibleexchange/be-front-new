import Relay from 'react-relay';

export default {
  library: (Component) => Relay.QL`
    query {
		library {
        ${Component.getFragment('library')}
      }
    }
  `
};
