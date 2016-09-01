import Relay from 'react-relay';
import App from './AppComponent';
import Dashboard from '../Dashboard/DashboardContainer';

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${Dashboard.getFragment('viewer')},
      }
    `,
  },
});