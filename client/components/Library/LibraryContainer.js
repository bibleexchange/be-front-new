import Relay from 'react-relay';
import Library from './LibraryComponent';

export default Relay.createContainer(Library, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
		courses(first:5) {
		  edges {
			node {
			  id
			  title
			}
		  }
		  pageInfo{
			  hasPreviousPage
			  hasNextPage
		  }
		}
	   }`
  }
});