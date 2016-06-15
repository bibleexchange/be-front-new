import Relay from 'react-relay';

export default {
  course: (Component) => Relay.QL`
	query {
      courseQuery(id:$courseId){
        ${Component.getFragment('course')}
      }
    }`
}; 