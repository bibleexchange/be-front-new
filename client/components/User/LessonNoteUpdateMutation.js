import Relay from 'react-relay';

export default class LessonNoteUpdateMutation extends Relay.Mutation {

  static fragments = {
   lessonnote: () => Relay.QL`fragment on LessonNote {id, lesson_id, note_id, order_by }`,
  };

  getMutation(){
	  return Relay.QL`mutation LessonNoteUpdate {lessonNoteUpdate}`;
  }

  getVariables(){

	return {
	      id:this.props.lessonnote.id,
	      lesson_id:this.props.noteChanged.lesson_id,
	      note_id:this.props.noteChanged.note_id,
        order_by: this.props.noteChanged.order_by
	    };
  }

  getFatQuery(){
	  return Relay.QL`fragment on LessonNoteUpdatePayload {lessonNote {id, lesson_id, note_id, order_by}}`;
  }

  getConfigs(){
	return [{
	  type:'FIELDS_CHANGE',
	  fieldIDs: {lessonNote:this.props.lessonnote.id}
	}];
  }

  getOptimisticResponse(){
	  return {lessonNote : {
            id: this.props.lessonnote.id,
    	    lesson_id:this.props.noteChanged.lesson_id,
	    note_id:this.props.noteChanged.note_id,
            order_by: this.props.noteChanged.order_by
          }};
  }
}
