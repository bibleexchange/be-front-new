import Relay from 'react-relay';
import auth from '../../components/App/auth'

export default class Create extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        error {
          code
          message
        }
        userCourses(first:15){
          edges{
            node{
              id
            }
          }
        }
          
      }`,
  };


    getMutation() {
        return Relay.QL`mutation CourseCreate {userCourseCreate}`;
    }

    getVariables() {
      return {
        token: auth.getToken(),
        id: this.props.userCourse.id,
        description: this.props.userCourse.description,
        title: this.props.userCourse.title,
        reference: this.props.userCourse.verse? this.props.userCourse.verse.reference:null
      }
    }

    getFatQuery() {
        return Relay.QL`fragment on CourseCreatePayload {
              error,
              code,
              clientMutationId,
              newCourseEdge
              courses
        }`
    }

    getConfigs() {
    // Behaviors can be one of 'append', 'ignore', 'prepend', 'refetch', or 'remove'.
        return [{
            type: 'RANGE_ADD',
            parentName: 'courses',
            parentID: this.props.userCourses,
            connectionName: 'userCourse',
            edgeName: 'newCourseEdge',
            rangeBehaviors: {
                '': 'append',
                'status(any)': 'append',
                'status(active)': 'append',
                'status(completed)': 'ignore',
            },
        }]
    }

}