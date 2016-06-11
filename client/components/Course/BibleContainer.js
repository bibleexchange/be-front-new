import Relay from 'react-relay';
import Bible from './BibleComponent';

export default Relay.createContainer(Bible, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        bibleNavs
      }`
  }
});
