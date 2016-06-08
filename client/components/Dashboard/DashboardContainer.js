import Relay from 'react-relay';
import Dashboard from './DashboardComponent';
import Library from '../Library/LibraryContainer';

export default Relay.createContainer(Dashboard, {
	
  fragments: {
    viewer: () => Relay.QL`
    fragment on User {
		id
		course(id: 1) {
		  id
		  name
		  url
		  description
		  modules (first:10){
			edges {
			  node {
				id
				name
				description
				chapters (first:10) {
				  edges {
					node {
					  id
					  name
					  description
					  steps (first:10){
						edges {
						  node {
							id
							body
						  }
						}
					  }
					}
				  }
				}
			  }
			}
		  }
		}
  }`
 }
});