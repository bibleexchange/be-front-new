import Relay from 'react-relay';

export default class CourseUpdateMutation extends Relay.Mutation {

  static fragments = {
    course: () => Relay.QL`fragment on Course {id, title}`,
  };

  getMutation() {
	                                                                                                                                                                                                          return Relay.QL`mutation CourseUpdate {courseUpdate}`;
  }

  getVariables() {
	                                                                                                                                                                                                        return {
	                                                                                                          id: this.props.course.id,
	                                                                                                          title: this.props.title
	    };
  }

  getFatQuery() {
	                                                                                                                                                                                                          return Relay.QL`fragment on UpdateCoursePayload {course {id, title}}`;
  }

  getConfigs() {
	                                                                                                                                                                                                        return [{
	                                                                                                      type: 'FIELDS_CHANGE',
	                                                                                                      fieldIDs: { course: this.props.course.id }
	}];
  }

  getOptimisticResponse() {
	                                                                                                                                                                                                          return { course: { id: this.props.course.id, title: this.props.title } };
  }
}

/*
mutation CourseUpdate {
  courseUpdate(input: {id: "Q291cnNlOjc", title: "Romans 1", clientMutationId: "1"}) {
    clientMutationId
    course {
      title
    }
  }
}

*/
