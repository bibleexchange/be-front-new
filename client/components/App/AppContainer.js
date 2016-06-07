import Relay from 'react-relay';
import App from './AppComponent';
import Dashboard from '../Dashboard/DashboardContainer';
import Navbar from '../Navbar/NavbarContainer';
import Footer from '../Footer/FooterContainer';

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
		${Dashboard.getFragment('viewer')},
        ${Footer.getFragment('viewer')},
		${Navbar.getFragment('viewer')}
      }`
  }
});
