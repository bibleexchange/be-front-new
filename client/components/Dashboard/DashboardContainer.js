import Relay from 'react-relay';
import Dashboard from './DashboardComponent';
import Library from '../Library/LibraryContainer';

export default Relay.createContainer(Dashboard, {
	
  fragments: {
    viewer: () => Relay.QL`
       fragment on User {
        username
        website
		widgets
      }`,
   library: () => Relay.QL`
      fragment on Library {
		notebooks {
			edges {
				id
				}
		}
	   }`
  }
});