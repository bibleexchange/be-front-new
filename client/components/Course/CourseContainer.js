import Relay from 'react-relay';
import Course from './CourseComponent';

export default Relay.createContainer(Bible, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        bibleNavs
      }`
  }
});
