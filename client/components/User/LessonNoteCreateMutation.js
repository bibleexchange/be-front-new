import Relay from 'react-relay';

export default class LessonNoteCreateMutation extends Relay.Mutation {

  static fragments = {
   lessonnote: () => Relay.QL`fragment on LessonNote {id, lesson_id, note_id, order_by}`,
  };

  getMutation(){
	  return Relay.QL`mutation LessonNoteCreate {lessonNoteCreate}`;
  }

  getVariables(){

	return {
	      id:this.props.lessonnote.id,
        note_id: this.props.lessonnote.note_id,
        lesson_id: this.props.lessonnote.lesson_id,
        order_by: this.props.lessonnote.order_by
	    };
  }

  getFatQuery(){
	  return Relay.QL`fragment on LessonNoteCreatePayload {lessonnote {id, lesson_id, note_id, order_by}}`;
  }

  getConfigs(){
	return [{
	  type:'FIELDS_CHANGE',
	  fieldIDs: {lessonnote:this.props.lessonnote.id}
	}];
  }

  getOptimisticResponse(){
	  return {lessonnote : {
            id: this.props.lessonnote.id,
    	      note_id:this.props.lessonnote.note_id,
            lesson_id: this.props.lessonnote.lesson_id,
            order_by: this.props.lessonnote.order_by
          }};
  }
}
