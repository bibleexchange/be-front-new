import Relay from 'react-relay';
import App from './AppComponent';
import Dashboard from '../Dashboard/DashboardContainer';

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
		name
		email
		authenticated
        ${Dashboard.getFragment('viewer')},
      }
    `,
	bibleChapter: () => Relay.QL`
      fragment on BibleChapter {
		verseCount
      }
    `,
  },
});