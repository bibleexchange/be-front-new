import Relay from 'react-relay';
import auth from '../../components/App/auth'

export default class LessonCreateMutation extends Relay.Mutation {

    static fragments = {
        userCourse: () => Relay.QL`fragment on UserCourse{lessons(first:100){edges}}`,
    };

    getMutation() {
        return Relay.QL`mutation LessonCreate {userLessonCreate}`;
    }

    getVariables() {
        return {
            token: auth.getToken(),
            course_id: this.props.userCourse.id,
            body: "",
            title: "New Lesson"
        };
    }

    getFatQuery() {
        return Relay.QL`fragment on LessonCreatePayload {
              error,
              code,
              clientMutationId,
              course {
                lessons
              }
        }`
    }

    getConfigs() {
      return [{
        type: "FIELDS_CHANGE",
        fieldIDs: {
          course: this.props.userCourse.id
        }
      }]
    }

}
