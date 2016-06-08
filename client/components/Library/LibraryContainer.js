import Relay from 'react-relay';
import Library from './LibraryComponent';

export default Relay.createContainer(Library, {
  fragments: {
    library: () => Relay.QL`
      fragment on Library {
		id
	   }`
  }
});

//  notebooks(first:2){edges{node{id}}}