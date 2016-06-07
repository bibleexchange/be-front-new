import Relay from 'react-relay';
import Dashboard from './DashboardComponent';
import Library from '../Library/LibraryContainer';

export default Relay.createContainer(Dashboard, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets(first: 10) {
          edges {
            node {
              id
              name
              description
              url
            }
          }
        }
      }`,
    library: () => Relay.QL`
      fragment on Library {
        ${Library.getFragment('library')}
      }`
  }
});
