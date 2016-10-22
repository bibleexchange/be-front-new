import Relay from 'react-relay';

export default class StepUpdateMutation extends Relay.Mutation {

  static fragments = {
   step: () => Relay.QL`fragment on Step {id, lesson_id, note_id, order_by }`,
  };

  getMutation(){
	  return Relay.QL`mutation StepUpdate {stepUpdate}`;
  }

  getVariables(){

	return {
	      id:this.props.step.id,
	      lesson_id:this.props.noteChanged.lesson_id,
	      note_id:this.props.noteChanged.note_id,
        order_by: this.props.noteChanged.order_by
	    };
  }

  getFatQuery(){
	  return Relay.QL`fragment on StepUpdatePayload {step {id, lesson_id, note_id, order_by}}`;
  }

  getConfigs(){
	return [{
	  type:'FIELDS_CHANGE',
	  fieldIDs: {lessonNote:this.props.step.id}
	}];
  }

  getOptimisticResponse(){
	  return {lessonNote : {
            id: this.props.step.id,
    	    lesson_id:this.props.noteChanged.lesson_id,
	    note_id:this.props.noteChanged.note_id,
            order_by: this.props.noteChanged.order_by
          }};
  }
}
