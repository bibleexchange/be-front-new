import Relay from 'react-relay';

export default class LessonUpdateMutation extends Relay.Mutation {

  static fragments = {
   lesson: () => Relay.QL`fragment on Lesson {id, title, summary, course_id, order_by}`,
  };


  getMutation(){
	  return Relay.QL`mutation LessonUpdate {lessonUpdate}`;
  }

  getVariables(){

	return {
	      id:this.props.lesson.id,
	      title:this.props.lessonChanged.title,
        summary: this.props.lessonChanged.summary,
        course_id: this.props.lessonChanged.course_id,
        order_by: this.props.lessonChanged.order_by
	    };
  }

  getFatQuery(){
	  return Relay.QL`fragment on LessonUpdatePayload {
        lesson {
          id,
          title,
          summary,
          course_id,
          order_by
      }
    }`;
  }

  getConfigs(){
	return [{
	  type:'FIELDS_CHANGE',
	  fieldIDs: {lesson:this.props.lesson.id}
	}];
  }

  getOptimisticResponse(){
	  return {viewer:{course:{
      lesson : {
              id: this.props.lesson.id,
      	      title:this.props.lessonChanged.title,
              summary: this.props.lessonChanged.summary,
              course_id: this.props.lessonChanged.course_id,
              order_by: this.props.lessonChanged.order_by
            }
    }}};
  }
}
