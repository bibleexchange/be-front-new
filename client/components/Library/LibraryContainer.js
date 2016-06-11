import Relay from 'react-relay';
import Library from './LibraryComponent';

export default Relay.createContainer(Library, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
		courses {id,title}
	   }`
  }
});