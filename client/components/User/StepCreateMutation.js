import Relay from 'react-relay';

export default class StepCreateMutation extends Relay.Mutation {

  static fragments = {
    step: () => Relay.QL`fragment on Step {id, lesson_id, note_id, order_by}`,
  };

  getMutation() {
	                                                                                                                                                                                                          return Relay.QL`mutation StepCreate {stepCreate}`;
  }

  getVariables() {
	                                                                                                                                                                                                        return {
	                                                                                                          id: this.props.step.id,
  note_id: this.props.step.note_id,
  lesson_id: this.props.step.lesson_id,
  order_by: this.props.step.order_by
	    };
  }

  getFatQuery() {
	                                                                                                                                                                                                          return Relay.QL`fragment on StepCreatePayload {step {id, lesson_id, note_id, order_by}}`;
  }

  getConfigs() {
	                                                                                                                                                                                                        return [{
	                                                                                                      type: 'FIELDS_CHANGE',
	                                                                                                      fieldIDs: { step: this.props.step.id }
	}];
  }

  getOptimisticResponse() {
	                                                                                                                                                                                                          return { step: {
  id: this.props.step.id,
  note_id: this.props.step.note_id,
  lesson_id: this.props.step.lesson_id,
  order_by: this.props.step.order_by
} };
  }
}
