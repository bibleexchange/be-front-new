import Relay from 'react-relay';

export default class LessonNoteDestroyMutation extends Relay.Mutation {

  static fragments = {
   lessonnote: () => Relay.QL`fragment on LessonNote {id, lesson_id, note_id, order_by}`,
  };

  getMutation(){
	  return Relay.QL`mutation LessonNoteDestroy {lessonNoteDestroy}`;
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
	  return Relay.QL`fragment on LessonNoteDestroyPayload {
      destroyedLessonNoteID,
      lesson { notes }
    }`;
  }

  getConfigs(){
  	return [{
      type: 'NODE_DELETE',
      parentName: 'lesson',
      parentID: this.props.lessonnote.lesson_id,
      connectionName: 'lessonnote',
      deletedIDFieldName: 'destroyedLessonNoteID',
  	}];
  }

  getOptimisticResponse(){
	  return {lessonnote : null};
  }
}
