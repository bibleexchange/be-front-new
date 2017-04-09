import Relay from 'react-relay';

export default class StepDestroyMutation extends Relay.Mutation {

  static fragments = {
    step: () => Relay.QL`fragment on Step {id, lesson_id, note_id, order_by}`,
  };

  getMutation() {
	                                                                                                                                                                                                          return Relay.QL`mutation StepDestroy {stepDestroy}`;
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
	                                                                                                                                                                                                          return Relay.QL`fragment on StepDestroyPayload {
      destroyedStepID,
      lesson { steps }
    }`;
  }

  getConfigs() {
  	                                                                                                    return [{
    type: 'NODE_DELETE',
    parentName: 'lesson',
    parentID: this.props.steps.lesson_id,
    connectionName: 'step',
    deletedIDFieldName: 'destroyedStepID',
  	}];
  }

  getOptimisticResponse() {
	                                                                                                                                                                                                          return { step: null };
  }
}
