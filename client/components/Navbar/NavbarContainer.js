import Relay from 'react-relay';
import Navbar from './NavbarComponent';

export default Relay.createContainer(Navbar, {
   fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
		id
		auth {
		  firstname
		  username
		  email
		}
  }`,
  }
});
