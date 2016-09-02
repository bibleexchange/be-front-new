import Relay from 'react-relay';
import Dashboard from './DashboardComponent';

export default Relay.createContainer(Dashboard, {
  initialVariables: {
	libraryFilter:'',
  }, 
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
		name
		email
		authenticated
      }
    `,
  }
});