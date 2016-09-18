import Relay from 'react-relay';

export default class CourseUpdateMutation extends Relay.Mutation {

  static fragments = {
 /*   course: () => Relay.QL`fragment on Course {id, identifier, title}`,*/
  };

  getMutation(){
	  return Relay.QL`mutation CourseUpdate {courseUpdate}`;
  }

  getVariables(){
    console.log(this.props);
	  return {
      id:this.props.course.identifier,
      title:this.props.course.title
    };
  }

  getFatQuery(){
//	  return Relay.QL`fragment on CourseUpdatePayload {course {id, identifier, title}}`;
  }

  getConfigs(){
	return [{
	  type:'FIELDS_CHANGE',
	  fieldIDs: {course:this.props.course.id}
	}];
  }

  getOptimisticResponse(){
	  return {course : {id:this.props.course.id, title:this.props.course.title}};
  }



}

/*
mutation CourseUpdate($courseId: Int, $courseTitle: String) {
  courseUpdate(input: {id: $courseId, title: $courseTitle, clientMutationId:""}) {
    clientMutationId
    course {
      title
    }
  }
}

*/
