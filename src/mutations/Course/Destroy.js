import Relay from 'react-relay';
import auth from '../../components/App/auth'

export default class Destroy extends Relay.Mutation {

  static fragments = {
    userCourse: () => Relay.QL`fragment on UserCourse {id}`,
  };

  getMutation() {
    return Relay.QL`mutation CourseDestroy {userCourseDestroy}`;
  }

  getVariables() {
    return {
      id: this.props.userCourse.id,
      token: auth.getToken()
  };
  }

  getFatQuery() {
    return Relay.QL`fragment on CourseDestroyPayload {error, code, course{id}}`;
  }

  getConfigs() {
  return [{
  type: 'REQUIRED_CHILDREN',
  // Forces these fragments to be included in the query
  children: [Relay.QL`
  fragment on CourseDestroyPayload {
  course{id}
  }
  `],
  }];
  }

  getOptimisticResponse() {
  return { userCourse: null };
  }
  }
