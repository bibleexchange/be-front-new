import Relay from 'react-relay';
import App from './AppComponent';
import Dashboard from '../Dashboard/DashboardContainer';

export default Relay.createContainer(App, {
  initialVariables: {
	reference:'john_3_16'
  }, 
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${Dashboard.getFragment('viewer')},
      }
    `,
  },
});