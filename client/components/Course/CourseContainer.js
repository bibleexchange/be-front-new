import Relay from 'react-relay';
import Course from './CourseComponent';

export default Relay.createContainer(Course, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        course{
			title
		}
      }`
  }
});
