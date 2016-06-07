import Relay from 'react-relay';
import Library from './LibraryComponent';

export default Relay.createContainer(Library, {
  fragments: {
    library: () => Relay.QL`
      fragment on Library {
        pages(first:1, page: 1, filter:"VIEWED") {
			edges {
				node {
				  id
				}
			  }
          },
		 notebooks (first:1){
          edges {
            node {
              id
            }
          }
        }
      }`
  }
});
