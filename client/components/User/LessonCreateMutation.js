import Relay from 'react-relay';

export default class LessonCreateMutation extends Relay.Mutation {

  static fragments = {
    lesson: () => Relay.QL`fragment on Lesson {id, title, summary, course_id, order_by}`,
  };

  getMutation() {
	                                                                                                                                                                                                          return Relay.QL`mutation LessonCreate {lessonCreate}`;
  }

  getVariables() {
	                                                                                                                                                                                                        return {
	                                                                                                          id: this.props.lesson.id,
	                                                                                                          title: this.props.lesson.title,
  summary: this.props.lesson.summary,
  course_id: this.props.lesson.course_id,
  order_by: this.props.lesson.order_by
	    };
  }

  getFatQuery() {
	                                                                                                                                                                                                          return Relay.QL`fragment on LessonCreatePayload {lesson {id, title, summary, course_id, order_by}}`;
  }

  getConfigs() {
	                                                                                                                                                                                                        return [{
	                                                                                                      type: 'FIELDS_CHANGE',
	                                                                                                      fieldIDs: { lesson: this.props.lesson.id }
	}];
  }

  getOptimisticResponse() {
	                                                                                                                                                                                                          return { lesson: {
  id: this.props.lesson.id,
  title: this.props.lesson.title,
  summary: this.props.lesson.summary,
  course_id: this.props.lesson.course_id,
  order_by: this.props.lesson.order_by
} };
  }
}
