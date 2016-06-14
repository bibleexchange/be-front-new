import Relay from 'react-relay';
import App from './AppComponent';
import Dashboard from '../Dashboard/DashboardContainer';
import Footer from '../Footer/FooterContainer';
import Navbar from '../Navbar/NavbarContainer';

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
     fragment on Viewer {
        ${Dashboard.getFragment('viewer')}
        ${Footer.getFragment('viewer')}
		${Navbar.getFragment('viewer')}
      }`
  }
});
