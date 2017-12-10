import Relay from 'react-relay';
import auth from '../../components/App/auth'

export default class LessonDestroyMutation extends Relay.Mutation {

  static fragments = {
    userLesson: () => Relay.QL`fragment on UserLesson {id}`
  };

  getMutation() {
	   return Relay.QL`mutation LessonDestroy {userLessonDestroy}`;
  }

  getVariables() {
	    return {
            token: auth.getToken(),
            id: this.props.lesson.id
        };
  }


  getFatQuery() {
  return Relay.QL`fragment on LessonDestroyPayload {error, code, clientMutationId, lesson {id} }`;
  }

  getConfigs() {
  return [{
  type: 'REQUIRED_CHILDREN',
  // Forces these fragments to be included in the query
  children: [Relay.QL`
  fragment on LessonDestroyPayload {
  lesson{id}
  }
  `],
  }];
  }

  getOptimisticResponse() {
  return { userLesson: null };
  }
  }