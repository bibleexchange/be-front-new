import Relay from 'react-relay';
import App from './AppComponent';
import Navbar from '../Navbar/NavbarContainer';
import Footer from '../Footer/FooterContainer';

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${Footer.getFragment('viewer')},
		${Navbar.getFragment('viewer')}
      }`
  }
});
