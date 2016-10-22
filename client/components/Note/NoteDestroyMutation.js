import Relay from 'react-relay';

export default class NoteDestroyMutation extends Relay.Mutation {

  static fragments = {
   note: () => Relay.QL`fragment on Note {id}`,
  };

  getMutation(){
	  return Relay.QL`mutation NoteDestroy {noteDestroy}`;
  }

  getVariables(){

	return {
	      id:this.props.note.id
	    };
  }

  getFatQuery(){
	  return Relay.QL`fragment on NoteDestroyPayload {
      destroyedNoteID
    }`;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      // Forces these fragments to be included in the query
      children: [Relay.QL`
        fragment on NoteDestroyPayload {
          destroyedNoteID
        }
      `],
    }];
  }

  getOptimisticResponse(){
	  return {note : null};
  }
}
